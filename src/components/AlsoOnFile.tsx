"use client";

import { useRef } from "react";
import { MOTION_OK, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";
import { sideProjects } from "@/content/site";
import { Arrow } from "./Arrow";
import { ProjectArt } from "./ProjectArt";

const TONES = ["ink", "paper", "yellow"] as const;

/**
 * Secondary projects as a card stack. Each card sticks under the nav (CSS
 * position: sticky, so it works the same on touch and desktop); as the next
 * card slides over it, GSAP pushes the covered card back and dims it.
 */
export function AlsoOnFile() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".stack-sec__head h2", {
          clipPath: "inset(0 0 100% 0)",
          yPercent: 30,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: ".stack-sec__head", start: "top 85%" },
        });

        const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
        // Run each card's illustration only while the card is on screen.
        cards.forEach((card) =>
          ScrollTrigger.create({ trigger: card, start: "top bottom", end: "bottom top", toggleClass: "is-live" }),
        );
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          const depth = cards.length - 1 - i;
          // Explicit start values: tweening a filter from "none" would begin at black.
          gsap.fromTo(
            card.querySelector(".stack-card__inner"),
            { scale: 1, filter: "brightness(1)" },
            {
              scale: 1 - 0.045 * depth,
              filter: "brightness(0.55)",
              ease: "none",
              scrollTrigger: {
                trigger: next,
                start: "top bottom",
                end: "top 22%",
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="stack-sec" aria-labelledby="also-h">
      <header className="stack-sec__head">
        <h2 id="also-h" className="display">
          Also <span className="serif">on file.</span>
        </h2>
        <p className="mono dimmer">Three more projects, in brief</p>
      </header>

      <div className="stack-cards">
        {sideProjects.map((p, i) => (
          <article
            key={p.id}
            className="stack-card"
            data-tone={TONES[i % TONES.length]}
            style={{ "--i": i } as React.CSSProperties}
            aria-labelledby={`${p.id}-h`}
          >
            <div className="stack-card__inner">
              <div className="stack-card__main">
                <p className="stack-card__top mono" style={{ margin: 0 }}>
                  <span className="num">
                    {String(i + 1).padStart(2, "0")} / {String(sideProjects.length).padStart(2, "0")}
                  </span>
                  <span>Secondary project</span>
                </p>

                <div>
                  <h3 id={`${p.id}-h`} className="display display--tight">
                    {p.title}
                  </h3>
                  <p className="stack-card__kind mono mono--lg">{p.kind}</p>
                  <p className="stack-card__body">{p.body}</p>
                </div>

                <div>
                  <ul className="stack-card__tags mono" aria-label="Technologies">
                    {p.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  {p.repo && (
                    <a className="stack-card__btn mono mono--lg" href={p.repo.href} target="_blank" rel="noreferrer">
                      GitHub: {p.repo.label}
                      <Arrow />
                    </a>
                  )}
                </div>
              </div>

              <div className="stack-card__aside" aria-hidden="true">
                <div className="stack-card__art">
                  <ProjectArt id={p.id} />
                </div>
                <span className="stack-card__num display num">{String(i + 1).padStart(2, "0")}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
