"use client";

import { useRef } from "react";
import { MOTION_OK, gsap, useGSAP } from "@/lib/gsap";

type Props = { amount: string };

const CELLS_BEFORE = 14; // digits a reel rolls past before landing

/** Each reel's strip: a run of digits ending on the one it lands on. */
function stripFor(final: number, offset: number) {
  const seq: number[] = [];
  for (let k = 0; k < CELLS_BEFORE; k++) seq.push((final + offset + 1 + k * 3) % 10);
  seq.push(final);
  return seq;
}

/**
 * The prize amount as a slot machine: every digit is a reel that spins and
 * lands left to right, a lever pulls as it starts, and sparks burst on the
 * last stop. By default (no JS, reduced motion) the CSS shows every reel
 * already on its final digit.
 */
export function PrizeSlot({ amount }: Props) {
  const root = useRef<HTMLSpanElement>(null);
  const chars = [...amount];

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top 88%",
            once: true,
            onEnter: () => spin(0.9),
          },
        });
      });
    },
    { scope: root },
  );

  const spin = contextSafe((delay = 0) => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const reels = gsap.utils.toArray<HTMLElement>(".slot__reel", el);
    const sparks = gsap.utils.toArray<HTMLElement>(".slot__spark", el);
    const amt = el.querySelector(".slot__reels");
    const cell = reels[0]?.getBoundingClientRect().height ?? 0;
    if (!cell) return;

    gsap.killTweensOf([...reels.map((r) => r.firstElementChild), ...sparks, ".slot__knob", ".slot__stick"]);
    const tl = gsap.timeline({ delay });

    // Lever pull.
    tl.to(el.querySelector(".slot__stick"), { scaleY: 0.35, duration: 0.22, ease: "power2.in" }, 0)
      .to(el.querySelector(".slot__knob"), { y: "2.6rem", duration: 0.22, ease: "power2.in" }, 0)
      .to(el.querySelector(".slot__stick"), { scaleY: 1, duration: 0.9, ease: "elastic.out(1, 0.4)" }, 0.24)
      .to(el.querySelector(".slot__knob"), { y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)" }, 0.24)
      .set(amt, { attr: { "data-spinning": "true" } }, 0.15);

    // Reels: same speed, staggered stops, a small overshoot on landing.
    reels.forEach((reel, i) => {
      const strip = reel.firstElementChild as HTMLElement;
      const last = strip.children.length - 1;
      tl.fromTo(
        strip,
        { y: 0 },
        {
          y: -last * cell,
          duration: 1.3 + i * 0.28,
          ease: "back.out(0.9)",
          clearProps: "transform", // hand back to the CSS final position (stays right on resize)
        },
        0.18,
      );
    });

    // Sparks on the final stop.
    const end = 0.18 + 1.3 + (reels.length - 1) * 0.28;
    tl.set(amt, { attr: { "data-spinning": "false" } }, end - 0.05);
    sparks.forEach((s, i) => {
      const angle = (i / sparks.length) * Math.PI * 2 + 0.4;
      tl.fromTo(
        s,
        { x: 0, y: 0, scale: 0.3, opacity: 1 },
        {
          x: Math.cos(angle) * gsap.utils.random(70, 140),
          y: Math.sin(angle) * gsap.utils.random(40, 90),
          scale: gsap.utils.random(0.8, 1.4),
          opacity: 0,
          duration: 0.9,
          ease: "expo.out",
        },
        end - 0.08,
      );
    });
  });

  let reelIndex = 0;
  return (
    <span ref={root} className="slot">
      <span className="sr-only">{amount}</span>
      <span className="slot__machine" aria-hidden="true">
        <span className="slot__reels display num" data-spinning="false">
          {chars.map((c, i) => {
            if (!/\d/.test(c)) {
              return (
                <span key={i} className="slot__static">
                  {c}
                </span>
              );
            }
            const seq = stripFor(Number(c), reelIndex++);
            return (
              <span key={i} className="slot__reel" style={{ "--last": seq.length - 1 } as React.CSSProperties}>
                <span className="slot__strip">
                  {seq.map((d, k) => (
                    <span key={k} className="slot__cell">
                      {d}
                    </span>
                  ))}
                </span>
              </span>
            );
          })}
        </span>
        <span className="slot__sparks">
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i} className="slot__spark" />
          ))}
        </span>
      </span>
      <button type="button" className="slot__lever" onClick={() => spin(0)} aria-label="Spin the prize reels again">
        <span className="slot__stick" />
        <span className="slot__knob" />
      </button>
    </span>
  );
}
