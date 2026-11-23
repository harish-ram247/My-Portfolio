"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { contact, nav, person } from "@/content/site";
import { useLights } from "./LightsProvider";
import { ResumeMenu } from "./ResumeMenu";

const spring = { type: "spring", stiffness: 520, damping: 34 } as const;

export function Nav() {
  const { on, toggle } = useLights();
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  // Track which section is under the top third of the viewport.
  useEffect(() => {
    const targets = nav
      .map((n) => document.querySelector<HTMLElement>(n.href))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-30% 0px -65% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className="nav"
        // Sheen follows the pointer via a CSS variable; no React re-render.
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--mx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
        }}
      >
        <a href="#top" className="nav__brand" aria-label={`${person.name}, back to top`}>
          H<i aria-hidden="true" />R
        </a>

        <nav aria-label="Sections">
          <ul className="nav__links mono">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="nav__link"
                  aria-current={active === n.href ? "true" : undefined}
                >
                  {n.label}
                  {active === n.href && (
                    <motion.span
                      layoutId="nav-mark"
                      className="nav__mark"
                      transition={reduce ? { duration: 0 } : spring}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__right">
          <ResumeMenu />
          <button
            type="button"
            className="lights mono"
            aria-pressed={on}
            onClick={toggle}
            title="Switch the lights on to see everything without the torch"
          >
            <span className="lights__track" aria-hidden="true">
              <motion.span
                className="lights__knob"
                animate={{ x: on ? 16 : 0 }}
                transition={reduce ? { duration: 0 } : spring}
              />
            </span>
            Lights {on ? "on" : "off"}
          </button>
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="menu-sheet"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="22" height="14" viewBox="0 0 22 14" aria-hidden="true">
              <path d={open ? "M3 1l16 12" : "M1 2h20"} stroke="currentColor" strokeWidth="1.5" />
              <path d={open ? "M3 13L19 1" : "M1 12h20"} stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-sheet"
            className="sheet"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduce ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul>
              {nav.map((n, i) => (
                <motion.li
                  key={n.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduce ? 0 : 0.08 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a href={n.href} className="display" onClick={() => setOpen(false)}>
                    {n.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="sheet__foot">
              <div className="sheet__resume mono">
                <a href={contact.resume.href} target="_blank" rel="noreferrer">
                  View resume
                </a>
                <a href={contact.resume.href} download={contact.resume.file}>
                  Download PDF
                </a>
              </div>
              <p className="mono dimmer" style={{ margin: 0 }}>
                {person.name} · {person.location}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
