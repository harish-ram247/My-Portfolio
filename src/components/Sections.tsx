"use client";

import { useRef } from "react";
import { MOTION_OK, gsap, useGSAP } from "@/lib/gsap";
import { certifications, contact, experience, person, record, skills } from "@/content/site";
import { Arrow } from "./Arrow";

const headingWipe = (trigger: string, target: string) =>
  gsap.from(target, {
    clipPath: "inset(0 0 100% 0)",
    yPercent: 30,
    duration: 1.2,
    ease: "expo.out",
    scrollTrigger: { trigger, start: "top 85%" },
  });

export function Toolkit() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        headingWipe(".chapter", ".chapter h2");
        gsap.utils.toArray<HTMLElement>(".kit__row").forEach((row) => {
          gsap.from(row.querySelectorAll("li"), {
            opacity: 0,
            yPercent: 70,
            duration: 0.9,
            stagger: 0.05,
            ease: "expo.out",
            scrollTrigger: { trigger: row, start: "top 90%" },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="toolkit" className="section wrap theme-paper" aria-labelledby="kit-h">
      <header className="chapter">
        <h2 id="kit-h" className="display">
          What I build <span className="serif">with.</span>
        </h2>
        <p className="mono dimmer">Grouped the way his resume groups it</p>
      </header>
      <div className="kit">
        {skills.map((s) => (
          <div key={s.group} className="kit__row">
            <h3 className="mono mono--lg">{s.group}</h3>
            <ul className="kit__items">
              {s.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Results and certifications, on a yellow field. */
export function Evidence() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        headingWipe(".chapter", ".chapter h2");
        // Figures slide in from the left, one row at a time.
        gsap.utils.toArray<HTMLElement>(".tally").forEach((row) => {
          gsap.from(row.querySelector(".tally__fig"), {
            xPercent: -40,
            opacity: 0,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: { trigger: row, start: "top 88%" },
          });
        });
        gsap.from(".certs li", {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.06,
          ease: "expo.out",
          scrollTrigger: { trigger: ".certs", start: "top 88%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="evidence" className="section wrap theme-yellow" aria-labelledby="evidence-h">
      <header className="chapter">
        <h2 id="evidence-h" className="display">
          The evidence, <span className="serif">in order.</span>
        </h2>
        <p className="mono dimmer">Results and certifications</p>
      </header>

      <h3 className="evidence__sub mono mono--lg" style={{ marginTop: "clamp(2rem, 5vh, 3.5rem)" }}>Results</h3>
      <div className="tallies">
        {record.map((r) => (
          <div key={r.title} className="tally">
            <span className="tally__fig display num">{r.figure}</span>
            <div>
              <h4>{r.title}</h4>
              <p>
                {r.figure} {r.unit}. {r.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="evidence__sub mono mono--lg">Certifications</h3>
      <ul className="certs">
        {certifications.map((c) => (
          <li key={c.name}>
            <strong>{c.name}</strong>
            <span className="mono">{c.by}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Internships as a timeline: a rail that fills with light as it is scrolled. */
export function Experience() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".xp__title", {
          clipPath: "inset(0 0 100% 0)",
          yPercent: 30,
          duration: 1.3,
          ease: "expo.out",
          scrollTrigger: { trigger: ".xp__title", start: "top 85%" },
        });

        // The rail fills as the list passes the middle of the screen.
        gsap.to(".xp__fill", {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ".xp__list", start: "top 60%", end: "bottom 60%", scrub: 0.4 },
        });

        gsap.utils.toArray<HTMLElement>(".xp__item").forEach((item) => {
          // Node lights when the fill reaches it, and goes dark again scrolling back.
          gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: "top 60%",
              onEnter: () => item.classList.add("is-on"),
              onLeaveBack: () => item.classList.remove("is-on"),
            },
          });
          gsap.from(item.querySelectorAll("[data-xp]"), {
            opacity: 0,
            y: 34,
            duration: 1,
            stagger: 0.08,
            ease: "expo.out",
            scrollTrigger: { trigger: item, start: "top 78%" },
          });
          gsap.from(item.querySelectorAll(".xp__points li"), {
            opacity: 0,
            x: 24,
            duration: 0.9,
            stagger: 0.09,
            ease: "expo.out",
            scrollTrigger: { trigger: item.querySelector(".xp__points"), start: "top 86%" },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="experience" className="xp" aria-labelledby="xp-h">
      <h2 id="xp-h" className="xp__title display" data-text="Experience">
        Experience
      </h2>
      <p className="xp__sub mono dimmer">Two internships, most recent first</p>

      <ol className="xp__list">
        <li className="xp__rail" aria-hidden="true" />
        <li className="xp__fill" aria-hidden="true" />
        {experience.map((job) => (
          <li key={job.org} className="xp__item">
            <span className="xp__node" aria-hidden="true" />
            <p className="xp__label serif" data-xp>
              {job.label}
            </p>
            <p className="xp__when" data-xp>
              <span className="xp__year num">{job.year}</span>
              <span className="xp__month serif">{job.month}</span>
            </p>
            <h3 className="xp__role" data-xp>
              {job.role}
            </h3>
            <p className="xp__org mono mono--lg" data-xp>
              at <b>{job.org}</b>
            </p>
            <ol className="xp__points">
              {job.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ol>
            <ul className="xp__tags mono" aria-label="Worked with" data-xp>
              {job.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function LastThing() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({
          defaults: { ease: "expo.out" },
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });
        tl.from("h2", { clipPath: "inset(0 0 100% 0)", yPercent: 40, duration: 1.3 })
          .from("p", { opacity: 0, y: 30, duration: 1 }, 0.35)
          .from("small", { opacity: 0, duration: 0.8 }, 0.7);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="last" aria-labelledby="last-h">
      <h2 id="last-h" className="display">
        One last thing.
      </h2>
      <p className="serif">Your next backend developer might be right here.</p>
      <small className="mono mono--lg dim">{person.name}</small>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      {/* Two identical groups; the track slides left by one group's width, forever. */}
      <div className="marquee" aria-hidden="true">
        {[0, 1].map((g) => (
          <div key={g} className="marquee__group">
            {[0, 1, 2].map((n) => (
              <span key={n} className="marquee__name display outline">
                {person.name}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="footer__row mono">
        <ul>
          <li>
            <a className="link" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </li>
          <li>
            <a className="link" href={contact.github.href} target="_blank" rel="noreferrer">
              GitHub <Arrow size={10} />
            </a>
          </li>
          <li>
            <a className="link" href={contact.linkedin.href} target="_blank" rel="noreferrer">
              LinkedIn <Arrow size={10} />
            </a>
          </li>
        </ul>
        <p className="dimmer" style={{ margin: 0 }}>
          © 2026 {person.name} · {person.location}
        </p>
      </div>
    </footer>
  );
}
