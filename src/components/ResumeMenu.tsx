"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { contact } from "@/content/site";

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8Z" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2v8M4.5 6.8 8 10.3l3.5-3.5M2.5 13.5h11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Nav button that opens a small menu: view the resume in a new tab, or download it. */
export function ResumeMenu() {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const reduce = useReducedMotion();

  // Close on outside click and on Escape (focus returns to the button).
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Move focus to the first option when the menu opens from the keyboard or a click.
  useEffect(() => {
    if (open) wrap.current?.querySelector<HTMLAnchorElement>(".resume__item")?.focus();
  }, [open]);

  const onMenuKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const items = [...(wrap.current?.querySelectorAll<HTMLAnchorElement>(".resume__item") ?? [])];
    const i = items.indexOf(document.activeElement as HTMLAnchorElement);
    const next = e.key === "ArrowDown" ? (i + 1) % items.length : (i - 1 + items.length) % items.length;
    items[next]?.focus();
  };

  return (
    <div ref={wrap} className="resume">
      <motion.button
        ref={button}
        type="button"
        className="resume__btn mono"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        whileTap={reduce ? undefined : { scale: 0.96 }}
      >
        Resume
        <motion.svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          aria-hidden="true"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: reduce ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <path d="M2 3.5 5 6.5l3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            role="menu"
            aria-label="Resume"
            className="resume__menu"
            onKeyDown={onMenuKey}
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: reduce ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              role="menuitem"
              className="resume__item"
              href={contact.resume.href}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
            >
              <EyeIcon />
              <span>
                View resume
                <small className="mono">Opens in a new tab</small>
              </span>
            </a>
            <a
              role="menuitem"
              className="resume__item"
              href={contact.resume.href}
              download={contact.resume.file}
              onClick={() => setOpen(false)}
            >
              <DownloadIcon />
              <span>
                Download PDF
                <small className="mono">{contact.resume.file}</small>
              </span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
