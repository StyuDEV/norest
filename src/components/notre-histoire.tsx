"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import { useState } from "react";
import {
  versionOrder,
  versions,
  type Version,
  type VersionId,
} from "@/data/histoire";

// Trois langages d'animation, de plus en plus marqués :
//   longue  — lecture calme, fade simple, peu de mouvement
//   moyenne — paragraphes en cascade avec flou qui se résorbe
//   courte  — révélation mot-à-mot, ressort, typographie grande échelle

// ────────────────────────────────────────────────────────────────────────────
// Animation : LONGUE
// ────────────────────────────────────────────────────────────────────────────
const longContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
  exit: { opacity: 0, transition: { duration: 0.25, ease: "easeOut" } },
};

const longParagraph: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

function LongueView({ paragraphs }: { paragraphs: string[] }) {
  return (
    <motion.div
      variants={longContainer}
      initial="hidden"
      animate="show"
      exit="exit"
      className="space-y-6 font-serif text-[17px] leading-[1.75] text-stone-200 sm:text-lg sm:leading-[1.8]"
    >
      {paragraphs.map((p, i) => (
        <motion.p key={i} variants={longParagraph}>
          {p}
        </motion.p>
      ))}
    </motion.div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Animation : MOYENNE
// ────────────────────────────────────────────────────────────────────────────
const mediumContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
};

const mediumParagraph: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(6px)",
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

function MoyenneView({ paragraphs }: { paragraphs: string[] }) {
  return (
    <motion.div
      variants={mediumContainer}
      initial="hidden"
      animate="show"
      exit="exit"
      className="space-y-7 font-serif text-[19px] leading-[1.7] text-stone-100 sm:text-xl sm:leading-[1.75]"
    >
      {paragraphs.map((p, i) => (
        <motion.p key={i} variants={mediumParagraph}>
          {p}
        </motion.p>
      ))}
    </motion.div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Animation : COURTE
// ────────────────────────────────────────────────────────────────────────────
const shortContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.32, delayChildren: 0.1 },
  },
  exit: { opacity: 0, transition: { duration: 0.4, ease: "easeIn" } },
};

const shortLine: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045 } },
  exit: {
    opacity: 0,
    y: -16,
    filter: "blur(8px)",
    transition: { duration: 0.35 },
  },
};

const shortWord: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(14px)", scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 22, mass: 0.6 },
  },
};

function ShortLine({ text }: { text: string }) {
  const words = text.split(/\s+/);
  return (
    <motion.p
      variants={shortLine}
      className="font-serif text-3xl leading-[1.15] tracking-tight text-stone-50 sm:text-5xl sm:leading-[1.1] md:text-6xl"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={shortWord}
          className="mr-[0.28em] inline-block will-change-transform"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}

function CourteView({ paragraphs }: { paragraphs: string[] }) {
  return (
    <motion.div
      variants={shortContainer}
      initial="hidden"
      animate="show"
      exit="exit"
      className="space-y-10 sm:space-y-12"
    >
      {paragraphs.map((p, i) => (
        <ShortLine key={i} text={p} />
      ))}
    </motion.div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Sélecteur de version (pill avec indicateur partagé)
// ────────────────────────────────────────────────────────────────────────────
function VersionSwitcher({
  active,
  onChange,
}: {
  active: VersionId;
  onChange: (id: VersionId) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Choisir la longueur du récit"
      className="inline-flex rounded-full border border-white/15 bg-white/[0.04] p-1 backdrop-blur-sm"
    >
      {versionOrder.map((id) => {
        const v = versions[id];
        const isActive = id === active;
        return (
          <button
            key={id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(id)}
            className={`relative rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] transition-colors sm:px-5 sm:py-2 sm:text-[13px] ${
              isActive ? "text-stone-950" : "text-stone-300 hover:text-white"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="version-pill"
                className="absolute inset-0 rounded-full bg-stone-50"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative">{v.short}</span>
          </button>
        );
      })}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Composant principal de la slide
// ────────────────────────────────────────────────────────────────────────────
export function NotreHistoire() {
  const [active, setActive] = useState<VersionId>("longue");
  const current: Version = versions[active];

  return (
    <section className="relative min-h-svh w-full overflow-hidden bg-stone-950 px-6 py-20 sm:px-12 sm:py-24 md:py-32">
      {/* Halo de fond, intensité progressive selon la version */}
      <motion.div
        aria-hidden
        animate={{
          opacity:
            active === "courte" ? 0.7 : active === "moyenne" ? 0.45 : 0.25,
        }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,235,200,0.12),_transparent_60%)]"
      />

      <div className="relative mx-auto flex max-w-3xl flex-col gap-12 sm:gap-16">
        {/* En-tête */}
        <header className="flex flex-col items-center gap-6 text-center sm:gap-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-stone-400">
            NOREST · Chapitre I
          </p>
          <h1 className="font-serif text-4xl tracking-tight text-stone-50 sm:text-5xl md:text-6xl">
            Notre histoire
          </h1>
          <VersionSwitcher active={active} onChange={setActive} />
        </header>

        {/* Contenu — transition entre versions */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              className="min-h-[420px] sm:min-h-[480px]"
            >
              {current.id === "longue" && (
                <LongueView paragraphs={current.paragraphs} />
              )}
              {current.id === "moyenne" && (
                <MoyenneView paragraphs={current.paragraphs} />
              )}
              {current.id === "courte" && (
                <CourteView paragraphs={current.paragraphs} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
