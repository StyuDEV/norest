"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { NotreHistoire } from "./notre-histoire";

/* ─── Slide metadata ─── */
const SLIDES = [
  { id: "hero", label: "Home", exif: "f/1.8 · 1/250s · ISO 200 · 35mm" },
  { id: "story", label: "Réalisation", exif: "f/2.2 · 1/180s · ISO 400 · 28mm" },
  {
    id: "histoire",
    label: "Story",
    exif: "f/2.4 · 1/120s · ISO 800 · 50mm",
  },
] as const;

const MARQUEE_ITEMS = [
  "Paris Est",
  "20e arrondissement",
  "NOREST",
  "William & Léonidas",
  "2013",
  "Nord-Est",
  "No Rest",
];

/* ─── Unsplash image URLs (placeholder — replace with your own) ─── */
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1592639296346-560c37a0f711?fm=jpg&q=85&w=2400&auto=format&fit=crop",
  heroSrcSet: [
    "https://images.unsplash.com/photo-1592639296346-560c37a0f711?fm=jpg&q=78&w=640&auto=format&fit=crop 640w",
    "https://images.unsplash.com/photo-1592639296346-560c37a0f711?fm=jpg&q=80&w=1024&auto=format&fit=crop 1024w",
    "https://images.unsplash.com/photo-1592639296346-560c37a0f711?fm=jpg&q=82&w=1600&auto=format&fit=crop 1600w",
    "https://images.unsplash.com/photo-1592639296346-560c37a0f711?fm=jpg&q=85&w=2400&auto=format&fit=crop 2400w",
  ].join(", "),
  story:
    "https://images.unsplash.com/photo-1685110191139-eb2caaac220d?fm=jpg&q=85&w=2400&auto=format&fit=crop",
  storySrcSet: [
    "https://images.unsplash.com/photo-1685110191139-eb2caaac220d?fm=jpg&q=78&w=640&auto=format&fit=crop 640w",
    "https://images.unsplash.com/photo-1685110191139-eb2caaac220d?fm=jpg&q=80&w=1024&auto=format&fit=crop 1024w",
    "https://images.unsplash.com/photo-1685110191139-eb2caaac220d?fm=jpg&q=82&w=1600&auto=format&fit=crop 1600w",
    "https://images.unsplash.com/photo-1685110191139-eb2caaac220d?fm=jpg&q=85&w=2400&auto=format&fit=crop 2400w",
  ].join(", "),
  histoire:
    "https://images.unsplash.com/photo-1674484524994-4d471383b1d2?fm=jpg&q=85&w=2400&auto=format&fit=crop",
  histoireSrcSet: [
    "https://images.unsplash.com/photo-1674484524994-4d471383b1d2?fm=jpg&q=78&w=640&auto=format&fit=crop 640w",
    "https://images.unsplash.com/photo-1674484524994-4d471383b1d2?fm=jpg&q=80&w=1024&auto=format&fit=crop 1024w",
    "https://images.unsplash.com/photo-1674484524994-4d471383b1d2?fm=jpg&q=82&w=1600&auto=format&fit=crop 1600w",
    "https://images.unsplash.com/photo-1674484524994-4d471383b1d2?fm=jpg&q=85&w=2400&auto=format&fit=crop 2400w",
  ].join(", "),
};

/* ═══════════════════════════════════════════════════
   SPLIT TEXT — character-by-character reveal
   ═══════════════════════════════════════════════════ */
function SplitText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <span className={className}>
      {[...children].map((ch, i) => (
        <span
          key={i}
          className="split-char"
          style={{ "--i": i } as React.CSSProperties}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN SITE COMPONENT
   ═══════════════════════════════════════════════════ */
export function NorestSite() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [activeId, setActiveId] = useState<string>("hero");
  const [displayCounter, setDisplayCounter] = useState<{
    num: string;
    label: string;
    exif: string;
  }>({
    num: "01",
    label: "hero",
    exif: SLIDES[0].exif,
  });
  const [counterChanging, setCounterChanging] = useState(false);

  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const currentIdRef = useRef("hero");
  const revealedRef = useRef(new Set<string>());

  /* ─── Loader dismiss ─── */
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaderDone(true);
      revealedRef.current.add("hero");
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  /* ─── Active slide handler ─── */
  const handleSetActive = useCallback((id: string) => {
    if (id === currentIdRef.current) return;
    currentIdRef.current = id;
    revealedRef.current.add(id);
    setActiveId(id);

    const idx = SLIDES.findIndex((s) => s.id === id);
    const slide = SLIDES[idx];

    setCounterChanging(true);
    setTimeout(() => {
      setDisplayCounter({
        num: String(idx + 1).padStart(2, "0"),
        label: slide.label,
        exif: slide.exif,
      });
      setCounterChanging(false);
    }, 180);
  }, []);

  /* ─── Scroll observer ─── */
  useEffect(() => {
    const sections = sectionsRef.current.filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const id = (visible.target as HTMLElement).dataset.section;
          if (id) handleSetActive(id);
        }
      },
      { threshold: [0.5, 0.75, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [handleSetActive]);

  /* ─── Keyboard navigation ─── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const sections = sectionsRef.current.filter(Boolean) as HTMLElement[];
      const idx = sections.findIndex((s) => s.classList.contains("is-active"));
      if (idx === -1) return;

      if (
        e.key === "ArrowDown" ||
        e.key === "PageDown" ||
        e.key === " "
      ) {
        e.preventDefault();
        sections[Math.min(idx + 1, sections.length - 1)]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        sections[Math.max(idx - 1, 0)]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  /* ─── Nav click ─── */
  const scrollTo = (id: string) => {
    const el = sectionsRef.current.find(
      (s) => s?.dataset.section === id
    );
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const slideClass = (id: string) =>
    `slide${activeId === id ? " is-active" : ""}${revealedRef.current.has(id) ? " has-revealed" : ""}`;

  return (
    <>
      {/* ═══ LOADER ═══ */}
      <div
        className={`loader${loaderDone ? " is-done" : ""}`}
        aria-hidden="true"
      >
        <div className="loader__inner">
          <div className="loader__title">norest archive</div>
          <div className="loader__bar">
            <div className="loader__bar-fill" />
          </div>
          <div className="loader__sub">loading 03 frames</div>
        </div>
      </div>

      {/* ═══ SLIDES ═══ */}
      <main className="relative" style={{ height: "300dvh" }}>
        {/* ════════ 01 — HERO ════════ */}
        <section
          ref={(el) => { sectionsRef.current[0] = el; }}
          className={slideClass("hero")}
          id="hero"
          data-section="hero"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="slide__bg"
            src={IMAGES.hero}
            srcSet={IMAGES.heroSrcSet}
            sizes="100vw"
            alt=""
            loading="eager"
            decoding="async"
          />
          <div className="slide__shade" />
          <div className="slide__leak" />
          <div className="hero-mark">
            <span className="hero-mark__text">NOREST...</span>
          </div>
        </section>

        {/* ════════ 02 — STORY ════════ */}
        <section
          ref={(el) => { sectionsRef.current[1] = el; }}
          className={slideClass("story")}
          id="story"
          data-section="story"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="slide__bg"
            src={IMAGES.story}
            srcSet={IMAGES.storySrcSet}
            sizes="100vw"
            alt=""
            loading="eager"
            decoding="async"
          />
          <div className="slide__shade" />
          <div className="slide__leak" />

          <div className="story-watermark" aria-hidden="true">
            <span>NO</span>
            <span>REST</span>
          </div>

          <div className="story">
            <div className="story__left">
              <div className="story__pre">Paris Est</div>
              <h1 className="story__title">
                <span className="js-split">
                  <SplitText>NO</SplitText>
                </span>
                <span className="js-split">
                  <SplitText>REST</SplitText>
                </span>
              </h1>
              <p className="story__sub">
                Deux gamins du vingtième, deux trajectoires, la même faim.
                Caméras en main, les toits de Paris comme bureau, les nuits
                comme atelier.
              </p>
            </div>

            <div className="story__right">
              <div className="story__date">
                <div className="story__date-label">EST.</div>
                <div className="story__date-num">
                  <SplitText>20</SplitText>
                </div>
                <div className="story__date-num">
                  <SplitText>13</SplitText>
                </div>
                <div className="story__date-day">PARIS</div>
              </div>
              <div className="story__captured">
                <em>Fondé par</em>
                <strong>WILLIAM & LÉONIDAS</strong>
              </div>
            </div>
          </div>
        </section>

        {/* ════════ 03 — NOTRE HISTOIRE ════════ */}
        <section
          ref={(el) => { sectionsRef.current[2] = el; }}
          className={`${slideClass("histoire")} slide--histoire`}
          id="histoire"
          data-section="histoire"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="slide__bg"
            src={IMAGES.histoire}
            srcSet={IMAGES.histoireSrcSet}
            sizes="100vw"
            alt=""
            loading="eager"
            decoding="async"
          />
          <div className="slide__shade" />
          <div className="slide__leak" />
          <div className="histoire-overlay">
            <NotreHistoire />
          </div>
        </section>
      </main>

      {/* ═══ SLIDE COUNTER ═══ */}
      <div className="counter" aria-hidden="true">
        <span className={`counter__num${counterChanging ? " is-changing" : ""}`}>
          {displayCounter.num}
        </span>
        <div>
          <span className="counter__total">/ 03</span>
          <span className="counter__label">{displayCounter.label}</span>
        </div>
      </div>

      {/* ═══ EXIF ═══ */}
      <div className="exif" aria-hidden="true">
        <span className="exif__pill">EXIF</span>
        <span className={`exif__data${counterChanging ? " is-changing" : ""}`}>
          {displayCounter.exif}
        </span>
      </div>

      {/* ═══ STICKY RIGHT NAV ═══ */}
      <nav className="nav" aria-label="Sections">
        {SLIDES.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`nav__item${activeId === s.id ? " nav__item--active" : ""}`}
            onClick={() => scrollTo(s.id)}
          >
            {s.label.toUpperCase()}
          </button>
        ))}
      </nav>


      {/* ═══ MARQUEE TICKER ═══ */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[0, 1, 2, 3].map((pass) => (
            <div key={pass} className="marquee__copy">
              {MARQUEE_ITEMS.map((text, i) => (
                <span key={i} className="marquee__item">
                  {text}
                  <span className="marquee__dot">●</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
