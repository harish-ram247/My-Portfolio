"use client";

import { useEffect, useRef } from "react";
import { useLights } from "./LightsProvider";

type FlashlightProps = {
  /** Always-visible dark layer. Holds the real, accessible content. */
  base: React.ReactNode;
  /** Lit layer, revealed through the beam. Decorative duplicate: aria-hidden. */
  children: React.ReactNode;
  /** Beam radius in px on large screens. Scales down on small ones. */
  radius?: number;
  /** 0–1: share of the radius that is fully lit before the feathered falloff. */
  core?: number;
  /** 0–1: how quickly the beam follows the pointer. Lower is heavier. */
  follow?: number;
  /** Resting beam position as fractions of the scene, used before any input. */
  rest?: { x: number; y: number };
  /** Slow idle drift until the visitor first moves the beam. */
  idle?: boolean;
  className?: string;
};

/**
 * A torch that reveals a second layer through a soft-edged mask.
 * Pointer position is written to CSS custom properties from a rAF loop, so
 * moving the beam never re-renders React. The loop only runs while the scene
 * is on screen and the beam is still travelling.
 */
export function Flashlight({
  base,
  children,
  radius = 280,
  core = 0.34,
  follow = 0.14,
  rest = { x: 0.7, y: 0.42 },
  idle = true,
  className = "",
}: FlashlightProps) {
  const root = useRef<HTMLDivElement>(null);
  const { on } = useLights();
  const onRef = useRef(on);
  onRef.current = on;

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowPower =
      (navigator.hardwareConcurrency ?? 8) <= 4 ||
      ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) <= 4;
    if (lowPower) el.dataset.lowpower = "true";

    let rect = el.getBoundingClientRect();
    const cur = { x: rect.width * rest.x, y: rect.height * rest.y };
    const target = { ...cur };
    let frame = 0;
    let visible = false;
    let touched = false;
    let start = performance.now();

    const write = () => {
      el.style.setProperty("--fl-x", `${cur.x.toFixed(1)}px`);
      el.style.setProperty("--fl-y", `${cur.y.toFixed(1)}px`);
    };

    const sizeBeam = () => {
      rect = el.getBoundingClientRect();
      const r = Math.max(130, Math.min(radius, rect.width * 0.34));
      el.style.setProperty("--fl-r", `${r}px`);
      el.style.setProperty("--fl-core", `${Math.round(core * 100)}%`);
    };

    const tick = (now: number) => {
      frame = 0;
      if (!visible || onRef.current) return;
      if (!touched && idle && !reduce) {
        const t = (now - start) / 1000;
        target.x = rect.width * (rest.x + Math.sin(t * 0.55) * 0.09);
        target.y = rect.height * (rest.y + Math.cos(t * 0.4) * 0.07);
      }
      const k = lowPower ? 1 : follow;
      cur.x += (target.x - cur.x) * k;
      cur.y += (target.y - cur.y) * k;
      write();
      const moving = Math.abs(target.x - cur.x) + Math.abs(target.y - cur.y) > 0.4;
      if (moving || (!touched && idle && !reduce)) frame = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onPointer = (e: PointerEvent) => {
      rect = el.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
      touched = true;
      kick();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          start = performance.now();
          kick();
        }
      },
      { threshold: 0.05 },
    );

    const ro = new ResizeObserver(() => {
      sizeBeam();
      if (!touched) {
        cur.x = target.x = rect.width * rest.x;
        cur.y = target.y = rect.height * rest.y;
        write();
      }
    });

    sizeBeam();
    write();
    io.observe(el);
    ro.observe(el);
    el.addEventListener("pointermove", onPointer, { passive: true });
    el.addEventListener("pointerdown", onPointer, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      el.removeEventListener("pointermove", onPointer);
      el.removeEventListener("pointerdown", onPointer);
    };
    // Configuration is read once on mount; the beam is not re-created on re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={root} className={`flashlight ${className}`}>
      <div className="flashlight__base">{base}</div>
      <div className="flashlight__lit" aria-hidden="true">
        {children}
      </div>
      <div className="flashlight__glow" aria-hidden="true" />
    </div>
  );
}
