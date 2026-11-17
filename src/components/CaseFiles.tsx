"use client";

import { useRef } from "react";
import { MOTION_OK, gsap, useGSAP } from "@/lib/gsap";
import { caseStudies, type CaseStudy } from "@/content/site";
import { CyberShieldDiagram, IiotDiagram, TraceDiagram } from "./Diagrams";
import { Arrow } from "./Arrow";
import { Flashlight } from "./Flashlight";

const LAYOUT: Record<CaseStudy["id"], string> = { trace: "case--a", cybershield: "case--b", iiot: "case--c" };

function Figure({ id }: { id: CaseStudy["id"] }) {
  if (id === "trace")
    return (
      <figure className="case__fig" data-fig>
        <Flashlight
          className="flashlight--quiet"
          radius={230}
          rest={{ x: 0.36, y: 0.24 }}
          base={
            <div className="fig-dim">
              <TraceDiagram />
            </div>
          }
        >
          <TraceDiagram decorative />
        </Flashlight>
        <figcaption className="mono">Fig. 03 — How TRACE picks a source. Schematic.</figcaption>
      </figure>
    );
  if (id === "cybershield")
    return (
      <figure className="case__fig" data-fig>
        <div className="paper-sheet">
          <CyberShieldDiagram />
        </div>
        <figcaption className="mono" style={{ marginTop: "1.6rem" }}>
          Fig. 04 — The path of one complaint. Schematic.
        </figcaption>
      </figure>
    );
  return (
    <figure className="case__fig" data-fig>
      <Flashlight
        className="flashlight--quiet"
        radius={250}
        rest={{ x: 0.43, y: 0.5 }}
        base={
          <div className="fig-dim">
            <IiotDiagram />
          </div>
        }
      >
        <IiotDiagram decorative />
      </Flashlight>
      <figcaption className="mono">Fig. 05 — From sensor to dashboard.</figcaption>
    </figure>
  );
}

function Case({ c }: { c: CaseStudy }) {
  const long = c.title.length > 14;
  return (
    <article className={`case wrap ${LAYOUT[c.id]}`} data-accent={c.accent} aria-labelledby={`${c.id}-h`}>
      <div className="case__grid">
        <header className="case__head">
          <div>
            <h3 id={`${c.id}-h`} className={`case__title display ${long ? "case__title--long" : ""}`} data-title>
              {c.title}
            </h3>
            <p className="case__kind mono mono--lg">{c.kind}</p>
          </div>
          {c.id === "trace" && <p className="case__summary">{c.summary}</p>}
        </header>

        <Figure id={c.id} />

        <div className="case__copy" data-rise>
          {c.id !== "trace" && (
            <p className="case__summary" style={{ color: "var(--color-ivory)", marginBottom: "2rem" }}>
              {c.summary}
            </p>
          )}
          <h4 className="mono">Problem</h4>
          <p>{c.problem}</p>
          <h4 className="mono" style={{ marginTop: "1.75rem" }}>
            Solution
          </h4>
          <p>{c.solution}</p>
        </div>

        <div className="case__built" data-rise>
          <h4 className="mono dimmer" style={{ margin: "0 0 0.8rem", fontWeight: 400 }}>
            What he built
          </h4>
          <ul className="built">
            {c.built.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>

        <footer className="case__meta" data-rise>
          <ul className="stack mono mono--lg" aria-label="Technologies">
            {c.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem 2rem", alignItems: "center" }}>
            {c.status && <p className="status mono">{c.status}</p>}
            {c.repo && (
              <a className="link mono mono--lg" href={c.repo.href} target="_blank" rel="noreferrer">
                Repository: {c.repo.label}
                <Arrow />
              </a>
            )}
          </div>
        </footer>
      </div>
    </article>
  );
}

export function CaseFiles() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".chapter h2", {
          clipPath: "inset(0 0 100% 0)",
          yPercent: 30,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: ".chapter", start: "top 85%" },
        });

        gsap.utils.toArray<HTMLElement>(".case").forEach((el, i) => {
          const title = el.querySelector("[data-title]");
          const fig = el.querySelector("[data-fig]");
          const draws = el.querySelectorAll<SVGGeometryElement>("[data-draw]");

          // Each case enters differently: wipe from the left, from below, from the right.
          const wipes = ["inset(0 100% 0 0)", "inset(100% 0 0 0)", "inset(0 0 0 100%)"];
          gsap.from(title, {
            clipPath: wipes[i % 3],
            duration: 1.3,
            ease: "expo.inOut",
            // Drop the clip once revealed, or it would cut off the hover glow.
            clearProps: "clipPath",
            scrollTrigger: { trigger: el, start: "top 78%" },
          });

          gsap.from(fig, {
            opacity: 0,
            y: 50,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: { trigger: fig, start: "top 85%" },
          });

          draws.forEach((p) => {
            const len = p.getTotalLength();
            gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
          });
          gsap.to(draws, {
            strokeDashoffset: 0,
            ease: "none",
            stagger: 0.12,
            scrollTrigger: { trigger: fig, start: "top 75%", end: "bottom 60%", scrub: 0.8 },
          });

          gsap.from(el.querySelectorAll("[data-rise]"), {
            opacity: 0,
            y: 30,
            duration: 1,
            stagger: 0.12,
            ease: "expo.out",
            scrollTrigger: { trigger: el.querySelector("[data-rise]"), start: "top 86%" },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="case-files" className="section" style={{ paddingBottom: 0 }} aria-labelledby="cases-h">
      <header className="chapter chapter--dark wrap" style={{ marginInline: "var(--gutter)", paddingInline: 0 }}>
        <h2 id="cases-h" className="display">
          Three systems. <span className="serif">How each one works.</span>
        </h2>
        <p className="mono dimmer">Move the light over the figures</p>
      </header>
      {caseStudies.map((c) => (
        <Case key={c.id} c={c} />
      ))}
    </section>
  );
}
