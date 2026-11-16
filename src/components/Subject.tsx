"use client";

import { useRef } from "react";
import { MOTION_OK, gsap, useGSAP } from "@/lib/gsap";
import { person } from "@/content/site";

// Words from the resume objective that get the yellow marker.
const MARKED = ["backend", "development,", "REST", "APIs,", "Java", "distributed", "systems."];

export function Subject() {
  const root = useRef<HTMLElement>(null);
  const words = person.objective.split(" ");

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
        // Words rise from dim to full as the paragraph is read down the page.
        gsap.fromTo(
          ".w",
          { opacity: 0.18 },
          {
            opacity: 1,
            stagger: 0.05,
            ease: "none",
            scrollTrigger: { trigger: ".subject__lead", start: "top 82%", end: "bottom 50%", scrub: 0.5 },
          },
        );
        gsap.from(".file > div", {
          opacity: 0,
          y: 20,
          duration: 0.9,
          stagger: 0.06,
          ease: "expo.out",
          scrollTrigger: { trigger: ".file", start: "top 88%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="subject" className="section wrap theme-paper" aria-labelledby="subject-h">
      <header className="chapter">
        <h2 id="subject-h" className="display">
          The <span className="serif">subject.</span>
        </h2>
        <p className="mono dimmer">Who he is, in his own resume&rsquo;s words</p>
      </header>

      <div className="subject">
          <p className="subject__lead">
            {words.map((w, i) => (
              <span key={i}>
                <span className={`w ${MARKED.includes(w) ? "marker" : ""}`}>{w}</span>{" "}
              </span>
            ))}
          </p>

          <dl className="file">
            <div>
              <dt className="mono">Name</dt>
              <dd>{person.name}</dd>
            </div>
            <div>
              <dt className="mono">Studying</dt>
              <dd>{person.education.degree}</dd>
            </div>
            <div>
              <dt className="mono">At</dt>
              <dd>{person.education.school}</dd>
            </div>
            <div>
              <dt className="mono">Period</dt>
              <dd className="num">{person.education.period}</dd>
            </div>
            <div>
              <dt className="mono">CGPA</dt>
              <dd className="num">{person.education.cgpa} / 10</dd>
            </div>
            <div>
              <dt className="mono">Based in</dt>
              <dd>{person.location}</dd>
            </div>
          </dl>
      </div>
    </section>
  );
}
