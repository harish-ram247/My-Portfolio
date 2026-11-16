"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, animate, motion, useReducedMotion } from "framer-motion";
import { contact, person } from "@/content/site";
import { Arrow } from "./Arrow";

type Props = { open: boolean; origin: DOMRect | null; onClose: () => void };

const EASE = [0.16, 1, 0.3, 1] as const;

function Panel({ origin, onClose }: Omit<Props, "open">) {
  const panel = useRef<HTMLDivElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  // Grow the panel out of the button: start at the button's box, settle at rest.
  useLayoutEffect(() => {
    const el = panel.current;
    if (!el || !origin || reduce) return;
    const r = el.getBoundingClientRect();
    const dx = origin.left + origin.width / 2 - (r.left + r.width / 2);
    const dy = origin.top + origin.height / 2 - (r.top + r.height / 2);
    const controls = animate(
      el,
      {
        x: [dx, 0],
        y: [dy, 0],
        scaleX: [origin.width / r.width, 1],
        scaleY: [origin.height / r.height, 1],
        borderRadius: ["400px", "28px"],
      },
      { duration: 0.75, ease: EASE },
    );
    return () => controls.stop();
  }, [origin, reduce]);

  // Focus management: move focus in, keep Tab inside, close on Escape, lock scroll.
  useEffect(() => {
    close.current?.focus();
    const el = panel.current!;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = el.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const rows = [
    { label: "Email", value: contact.email, href: `mailto:${contact.email}`, external: false },
    { label: "LinkedIn", value: contact.linkedin.label, href: contact.linkedin.href, external: true },
    { label: "GitHub", value: contact.github.label, href: contact.github.href, external: true },
    ...(contact.phone
      ? [{ label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}`, external: false }]
      : []),
  ];

  return (
    <motion.div
      className="overlay"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: reduce ? 0 : 0.25 } }}
    >
      <motion.div
        className="overlay__scrim"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.4 }}
      />
      <div
        ref={panel}
        className="overlay__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="overlay-h"
        style={{ transformOrigin: "50% 50%" }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduce ? 0 : 0.38, duration: reduce ? 0 : 0.5 }}
        >
          <button ref={close} type="button" className="overlay__close" onClick={onClose} aria-label="Close contact details">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <h2 id="overlay-h" className="serif">
            Let&rsquo;s talk about what I can build for you.
          </h2>
          <p className="overlay__name display">{person.name}</p>
          <p className="dim" style={{ margin: "0.8rem 0 0", maxWidth: "44ch" }}>
            Open to internships and projects in backend engineering, cloud and AI.
          </p>

          <ul className="lines">
            {rows.map((r, i) => (
              <motion.li
                key={r.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduce ? 0 : 0.45 + i * 0.06, duration: reduce ? 0 : 0.5, ease: EASE }}
              >
                <a href={r.href} {...(r.external ? { target: "_blank", rel: "noreferrer" } : {})}>
                  <span className="mono">{r.label}</span>
                  <strong>{r.value}</strong>
                  <Arrow size={14} />
                </a>
              </motion.li>
            ))}
          </ul>

          <motion.a
            className="cta"
            href={`mailto:${contact.email}?subject=${encodeURIComponent("Project enquiry")}`}
            whileHover={reduce ? undefined : { scale: 1.04 }}
            whileTap={reduce ? undefined : { scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            Start a project
            <Arrow size={14} />
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function ContactOverlay({ open, origin, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(
    <AnimatePresence>{open && <Panel key="panel" origin={origin} onClose={onClose} />}</AnimatePresence>,
    document.body,
  );
}
