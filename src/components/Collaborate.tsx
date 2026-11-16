"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { MOTION_OK, gsap, useGSAP } from "@/lib/gsap";
import { ContactOverlay } from "./ContactOverlay";

// Where each string leaves the fist, in the hand SVG's 320×300 coordinate space,
// and where it meets the button, as a fraction of the button's width.
const STRINGS = [
  { hand: [197, 90], pill: 0.1, width: 1.1, sag: 0.05, speed: 0.9, phase: 0.2 },
  { hand: [209, 85], pill: 0.29, width: 0.8, sag: -0.03, speed: 1.25, phase: 1.7 },
  { hand: [223, 85], pill: 0.5, width: 1.3, sag: 0.04, speed: 0.75, phase: 3.1 },
  { hand: [240, 93], pill: 0.71, width: 0.9, sag: -0.045, speed: 1.1, phase: 4.4 },
  { hand: [253, 102], pill: 0.9, width: 1.15, sag: 0.03, speed: 0.95, phase: 5.6 },
] as const;

// Words thrown out of the button when it is clicked, before the overlay opens.
const WORDS = [
  { text: "Together", x: -170, y: -120, r: -8, box: "" },
  { text: "Hello", x: 135, y: -108, r: 9, box: "ink" },
  { text: "Ship", x: -260, y: 6, r: -4, box: "yellow" },
  { text: "Let\u2019s", x: 190, y: 40, r: 6, box: "" },
  { text: "Build", x: -130, y: 122, r: 5, box: "" },
  { text: "Talk", x: 105, y: 132, r: -7, box: "red" },
] as const;
const BURST_MS = 620;

function Hand() {
  const ink = "#0c0b0a";
  const paper = "#eae8e2";
  const s = { stroke: ink, strokeWidth: 2.3, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <svg viewBox="0 0 320 300" fill="none" aria-hidden="true">
      {/* loose string ends hanging below the grip */}
      <path d="M205 208C202 230 213 246 206 270" {...s} strokeWidth={1.1} />
      <path d="M217 203C222 226 212 250 221 279" {...s} strokeWidth={0.9} />
      <path d="M194 212C190 228 197 240 192 255" {...s} strokeWidth={1} />

      {/* jacket sleeve */}
      <path d="M-14 262C28 232 68 201 96 177L151 247C120 263 84 287 40 314Z" fill={ink} {...s} />
      <path d="M8 268C40 246 70 224 96 203" stroke={paper} strokeWidth={1} strokeLinecap="round" opacity={0.28} />
      {/* shirt cuff */}
      <path d="M96 177L117 165L173 232L151 247Z" fill={paper} {...s} />
      <circle cx="137" cy="221" r="3.4" fill={paper} stroke={ink} strokeWidth={1.6} />

      {/* fist */}
      <path
        d="M119 166C138 129 160 104 186 92C192 79 208 77 212 90C218 79 234 81 236 95C243 87 257 92 256 107C264 103 274 112 269 125C276 145 270 168 256 181C240 195 214 206 196 215C186 222 178 228 172 232Z"
        fill={paper}
        {...s}
      />
      {/* finger divisions */}
      <path d="M212 90C217 116 213 141 207 155" {...s} strokeWidth={1.7} />
      <path d="M236 95C241 120 238 146 231 166" {...s} strokeWidth={1.7} />
      <path d="M256 107C260 128 256 152 247 171" {...s} strokeWidth={1.7} />
      {/* knuckle creases */}
      <path d="M196 101c4-3 8-3 11 0M221 102c4-3 8-2 10 1M243 111c3-2 7-2 9 1" {...s} strokeWidth={1.2} />
      {/* thumb folded across the fingers */}
      <path
        d="M146 153C166 140 196 137 222 146C235 151 237 163 226 167C204 173 182 172 160 186"
        fill={paper}
        {...s}
      />
      <path d="M213 149C222 150 229 155 227 162" {...s} strokeWidth={1.4} />
      <path d="M172 150c6-2 12-2 18 0" {...s} strokeWidth={1.2} />
      {/* hatching under the fist and on the back of the hand */}
      <path d="M180 203l11-7M192 207l12-8M206 205l11-7M222 198l10-7M237 189l9-7" {...s} strokeWidth={1.1} />
      <path d="M136 150l7-10M144 156l8-12M133 166l6-8" {...s} strokeWidth={1.1} />
      <path d="M262 132l5 12M258 146l4 12" {...s} strokeWidth={1.1} />
    </svg>
  );
}

export function Collaborate() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const hand = useRef<HTMLDivElement>(null);
  const tug = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const paths = useRef<(SVGPathElement | null)[]>([]);
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState<DOMRect | null>(null);
  const [burst, setBurst] = useState(false);
  const [spread, setSpread] = useState(1);
  const timer = useRef<number | undefined>(undefined);
  const reduce = useReducedMotion();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  // Framer Motion owns the button itself: tilt, lift, press, light sweep.
  const rx = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });

  const onTilt = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (reduce || e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 16);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 14);
  };
  const resetTilt = () => {
    rx.set(0);
    ry.set(0);
  };

  const openOverlay = () => {
    if (open || burst) return;
    const show = () => {
      setOrigin(btn.current?.getBoundingClientRect() ?? null);
      setOpen(true);
    };
    if (reduce) return show();
    // Throw the words out first, then let the button grow into the overlay.
    setSpread(Math.min(1, Math.max(0.45, window.innerWidth / 1100)));
    setBurst(true);
    timer.current = window.setTimeout(show, BURST_MS);
  };
  const closeOverlay = useCallback(() => {
    setOpen(false);
    setBurst(false);
    // Return focus to the control that opened the dialog.
    requestAnimationFrame(() => btn.current?.focus());
  }, []);

  // GSAP owns everything around the button: hand, strings, the tug wrapper.
  useGSAP(
    () => {
      const stageEl = stage.current!;
      const handEl = hand.current!;
      const tugEl = tug.current!;
      const pointer = { x: 0 };
      const pointerTo = gsap.quickTo(pointer, "x", { duration: 0.9, ease: "power3.out" });
      let swayOn = false;
      let active = false;

      // Recompute every string from the live positions of the fist and the button.
      const layout = (time: number) => {
        const sr = stageEl.getBoundingClientRect();
        const hr = handEl.getBoundingClientRect();
        const br = tugEl.getBoundingClientRect();
        STRINGS.forEach((s, i) => {
          const p = paths.current[i];
          if (!p) return;
          const x1 = hr.left - sr.left + (s.hand[0] / 320) * hr.width;
          const y1 = hr.top - sr.top + (s.hand[1] / 300) * hr.height;
          const x2 = br.left - sr.left + br.width * s.pill;
          const y2 = br.bottom - sr.top - br.height * 0.3;
          const dx = x2 - x1;
          const dy = y2 - y1;
          const len = Math.hypot(dx, dy) || 1;
          const sway = swayOn ? Math.sin(time * s.speed + s.phase) * 0.012 + pointer.x * 0.03 * (i % 2 ? 1 : -0.6) : 0;
          const bow = (s.sag + sway) * len;
          // Control point pushed perpendicular to the string.
          const cx = (x1 + x2) / 2 + (-dy / len) * bow;
          const cy = (y1 + y2) / 2 + (dx / len) * bow;
          p.setAttribute("d", `M${x1.toFixed(1)} ${y1.toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`);
        });
      };

      const onTick = (time: number) => {
        if (active) layout(time);
      };

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        // Static composition: strings drawn once, redrawn on resize.
        const draw = () => layout(0);
        draw();
        const ro = new ResizeObserver(draw);
        ro.observe(stageEl);
        return () => ro.disconnect();
      });

      mm.add(MOTION_OK, () => {
        const strings = paths.current.filter(Boolean);
        gsap.set(strings, { strokeDasharray: 1, strokeDashoffset: 1 });
        layout(0);

        // Idle loop: small natural pulls on the hand, echoed by the button.
        const pull = gsap
          .timeline({ paused: true, repeat: -1, repeatDelay: 0.5, defaults: { ease: "sine.inOut" } })
          .to(handEl, { x: -24, y: 13, duration: 0.55, ease: "power2.out" })
          .to(tugEl, { x: -10, y: 6, rotation: -1.6, duration: 0.5, ease: "power2.out" }, "<0.06")
          .to(handEl, { x: 0, y: 0, duration: 1.3 })
          .to(tugEl, { x: 0, y: 0, rotation: 0, duration: 1.5, ease: "elastic.out(1, 0.45)" }, "<0.05")
          .to(handEl, { x: -10, y: 6, duration: 0.4, ease: "power2.out" }, "+=0.5")
          .to(tugEl, { x: -4, y: 3, duration: 0.4, ease: "power2.out" }, "<0.05")
          .to(handEl, { x: 0, y: 0, duration: 1 })
          .to(tugEl, { x: 0, y: 0, duration: 1.1, ease: "elastic.out(1, 0.5)" }, "<0.05");

        const entrance = gsap
          .timeline({
            paused: true,
            defaults: { ease: "expo.out" },
            onComplete: () => {
              swayOn = true;
              pull.play();
            },
          })
          .from(".collab__copy > *", { opacity: 0, y: 40, duration: 1.1, stagger: 0.1 })
          .from(tugEl, { opacity: 0, y: -40, duration: 1.1 }, 0.15)
          .from(handEl, { opacity: 0, x: -70, y: 110, rotation: -14, duration: 1.3 }, 0.35)
          .to(strings, { strokeDashoffset: 0, duration: 0.9, stagger: 0.09, ease: "power2.inOut" }, 1.15)
          .to(tugEl, { x: -9, y: 7, rotation: -1.5, duration: 0.25, ease: "power2.out" }, 1.95)
          .to(tugEl, { x: 0, y: 0, rotation: 0, duration: 1.4, ease: "elastic.out(1, 0.4)" }, 2.2)
          .from(".collab__cap", { opacity: 0, duration: 0.8 }, 2.2);

        const st = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top 62%",
            once: true,
            onEnter: () => entrance.play(),
          },
        });

        // Only run the per-frame string layout while the scene is on screen.
        const watcher = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            onToggle: (self) => {
              active = self.isActive;
              if (!active) pull.pause();
              else if (swayOn) pull.play();
            },
          },
        });

        const onMove = (e: PointerEvent) => {
          if (e.pointerType === "touch") return;
          const r = stageEl.getBoundingClientRect();
          pointerTo(((e.clientX - r.left) / r.width - 0.5) * 2);
        };
        const onLeave = () => pointerTo(0);
        stageEl.addEventListener("pointermove", onMove, { passive: true });
        stageEl.addEventListener("pointerleave", onLeave);
        gsap.ticker.add(onTick);

        return () => {
          gsap.ticker.remove(onTick);
          stageEl.removeEventListener("pointermove", onMove);
          stageEl.removeEventListener("pointerleave", onLeave);
          pull.kill();
          entrance.kill();
          st.kill();
          watcher.kill();
        };
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="collaborate" className="collab on-paper" aria-labelledby="collab-h">
      <div ref={stage} className="collab__stage">
        <svg className="collab__strings" aria-hidden="true">
          {STRINGS.map((s, i) => (
            <path
              key={i}
              ref={(el) => {
                paths.current[i] = el;
              }}
              pathLength={1}
              strokeWidth={s.width}
            />
          ))}
        </svg>

        <div className="collab__copy">
          <h2 id="collab-h" className="display">
            Pull me into <span className="serif">your team.</span>
          </h2>
          <p>
            Open to internships and projects in backend engineering, cloud and AI. Pull the string and
            say hello.
          </p>
        </div>

        <div className="collab__right">
          <div ref={tug} className="collab__tug">
            <motion.button
              ref={btn}
              type="button"
              className="pill"
              aria-haspopup="dialog"
              aria-expanded={open}
              onClick={openOverlay}
              onPointerMove={onTilt}
              onPointerLeave={resetTilt}
              style={{ rotateX: rx, rotateY: ry }}
              initial="rest"
              animate="rest"
              whileHover={reduce ? undefined : "hover"}
              whileTap={reduce ? undefined : "tap"}
              variants={{
                rest: { scale: 1, y: 0 },
                hover: { scale: 1.035, y: -5, transition: { type: "spring", stiffness: 300, damping: 18 } },
                tap: { scale: 0.965, y: 1, transition: { type: "spring", stiffness: 500, damping: 22 } },
              }}
            >
              <motion.span
                className="pill__sweep"
                aria-hidden="true"
                variants={{
                  rest: { x: "-140%" },
                  hover: { x: "330%", transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
                  tap: { x: "330%" },
                }}
              />
              <span className="pill__dot" aria-hidden="true" />
              Let&rsquo;s collaborate
            </motion.button>

            <AnimatePresence>
              {burst && (
                <div className="burst" aria-hidden="true">
                  {WORDS.map((w, i) => (
                    <motion.span
                      key={w.text}
                      data-box={w.box || undefined}
                      initial={{ x: "-50%", y: "-50%", scale: 0.2, opacity: 0, rotate: 0 }}
                      animate={{
                        x: `calc(-50% + ${w.x * spread}px)`,
                        y: `calc(-50% + ${w.y * spread}px)`,
                        scale: 1,
                        opacity: 1,
                        rotate: w.r,
                      }}
                      exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.2 } }}
                      transition={{ type: "spring", stiffness: 280, damping: 15, delay: i * 0.035 }}
                    >
                      {w.text}
                    </motion.span>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div ref={hand} className="collab__hand">
          <Hand />
        </div>

        <p className="collab__cap mono">Fig. 06 — Strings attached, in a good way</p>
      </div>

      <ContactOverlay open={open} origin={origin} onClose={closeOverlay} />
    </section>
  );
}
