"use client";

import { useEffect, useRef } from "react";
import { DESKTOP, MOTION_OK, gsap, useGSAP } from "@/lib/gsap";
import { person } from "@/content/site";
import { Flashlight } from "./Flashlight";

/**
 * One hero composition, rendered twice: a dark base that carries the real
 * heading and text, and a lit duplicate that the torch reveals. Elements share
 * data-h hooks so the intro timeline and parallax move both layers together.
 */
function Scene({ lit }: { lit: boolean }) {
  const Name = lit ? "p" : "h1";
  return (
    <div className={`hero-scene ${lit ? "hero-scene--lit" : ""}`}>
      <p className="hero__outline display outline" data-h="outline" data-intro aria-hidden="true">
        {person.rest}
      </p>

      <p className="hero__cap hero__cap--tl mono dimmer" data-h="cap" data-intro>
        A portfolio in six parts — {person.education.school}, 2024–2028
      </p>
      <p className="hero__cap hero__cap--tr mono dimmer" data-h="cap" data-intro>
        {person.location}
        <br />
        <span className="rec num" data-rec>
          Rec 00:00:00
        </span>
      </p>

      <div className="hero__block" data-h="block" data-intro />
      {lit && (
        <p className="hero__cap hero__cap--fig mono" data-h="cap" data-intro style={{ color: "var(--color-ivory-2)" }}>
          Fig. 01 — The subject
        </p>
      )}

      {lit && <div className="hero__halo" data-h="portrait" aria-hidden="true" />}
      <div className="hero__portrait" data-h="portrait" data-intro>
        <picture>
          <source
            type="image/webp"
            srcSet="/portrait/harish-cutout-640.webp 640w, /portrait/harish-cutout.webp 1100w"
            sizes="(max-width: 899px) 80vw, 46vw"
          />
          <img
            src="/portrait/harish-cutout.webp"
            width={1100}
            height={1105}
            alt={lit ? "" : `Portrait of ${person.name} in a dark blazer and white shirt`}
            fetchPriority="high"
            decoding="async"
            draggable={false}
          />
        </picture>
      </div>

      <p className="hero__full mono mono--lg dim" data-h="full" data-intro>
        {person.name}
      </p>
      <Name className="hero__name display" data-h="name" data-intro>
        {lit ? (
          person.first
        ) : (
          <>
            <span className="sr-only">{person.name}, </span>
            <span aria-hidden="true">{person.first}</span>
            <span className="sr-only">{person.role}</span>
          </>
        )}
      </Name>
    </div>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

        tl.set(q("[data-intro]"), { visibility: "visible" })
          .from(q('[data-h="outline"]'), { yPercent: 28, opacity: 0, duration: 1.6 }, 0.1)
          .from(
            q('[data-h="block"]'),
            { clipPath: "inset(100% 0 0 0)", duration: 1.2, ease: "expo.inOut" },
            0.25,
          )
          .from(
            q('[data-h="portrait"]'),
            { clipPath: "inset(100% 0 0 0)", yPercent: 6, duration: 1.4, ease: "expo.inOut" },
            0.4,
          )
          .from(
            q('[data-h="name"]'),
            { clipPath: "inset(0 0 100% 0)", yPercent: 40, duration: 1.3 },
            0.75,
          )
          .from(q('[data-h="full"]'), { opacity: 0, x: -16, duration: 0.9 }, 1.25)
          .from(q('[data-h="cap"]'), { opacity: 0, duration: 1, stagger: 0.06 }, 1.3)
          .from(q(".hero__hint"), { opacity: 0, y: 10, duration: 0.8 }, 1.9);
      });

      mm.add(`${MOTION_OK} and ${DESKTOP}`, () => {
        const q = gsap.utils.selector(root);
        const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.6 };
        // Parallax moves wrappers on y only; the intro uses yPercent and clip-path.
        gsap.to(q('[data-h="outline"]'), { y: -150, scrollTrigger: st });
        gsap.to(q('[data-h="portrait"]'), { y: 70, scrollTrigger: st });
        gsap.to(q('[data-h="block"]'), { y: -50, scrollTrigger: st });
        gsap.to(q('[data-h="name"]'), { y: -90, scrollTrigger: st });
      });
    },
    { scope: root },
  );

  // Documentary timecode: seconds since the page opened.
  useEffect(() => {
    const nodes = root.current?.querySelectorAll<HTMLElement>("[data-rec]");
    if (!nodes?.length) return;
    const t0 = Date.now();
    const pad = (n: number) => String(n).padStart(2, "0");
    const id = window.setInterval(() => {
      const s = Math.floor((Date.now() - t0) / 1000);
      const text = `Rec ${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}`;
      nodes.forEach((n) => (n.textContent = text));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section ref={root} id="top" className="hero" aria-label="Introduction">
      <Flashlight base={<Scene lit={false} />} radius={300} rest={{ x: 0.74, y: 0.4 }} className="h-full">
        <Scene lit />
      </Flashlight>
      <p className="hero__hint mono" aria-hidden="true">
        <i />
        Move the light
      </p>
    </section>
  );
}
