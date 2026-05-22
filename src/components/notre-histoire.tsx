"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import { useState } from "react";
import { versionOrder, versions, type VersionId } from "@/data/histoire";

/* ═══════════════════════════════════════════════════
   Animation variants — staggered paragraph reveal
   ═══════════════════════════════════════════════════ */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045, delayChildren: 0.06 },
  },
  exit: {
    transition: { staggerChildren: 0.025 },
  },
};

const paragraphVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -6,
    filter: "blur(3px)",
    transition: { duration: 0.28, ease: [0.4, 0, 1, 1] },
  },
};

/* ═══════════════════════════════════════════════════
   Version switcher
   ═══════════════════════════════════════════════════ */

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
            className={`relative rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] transition-colors sm:px-4 sm:py-1.5 sm:text-[11px] ${
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

/* ═══════════════════════════════════════════════════
   Composant principal
   ═══════════════════════════════════════════════════ */

export function NotreHistoire() {
  const [active, setActive] = useState<VersionId>("longue");

  return (
    <div className="relative mx-auto flex w-full max-w-6xl flex-col px-1 sm:px-0">
      {/* En-tête — sticky */}
      <header className="sticky top-0 z-10 flex flex-col items-center gap-2 pb-4 pt-1 text-center sm:gap-3 sm:pb-6 sm:pt-2">
        <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-stone-400 sm:text-[11px] sm:tracking-[0.4em]">
          NOREST · Chapitre I
        </p>
        <h2
          className="font-serif text-2xl tracking-tight text-stone-50 sm:text-4xl md:text-5xl"
          style={{ fontFamily: "var(--font-instrument-serif), serif" }}
        >
          Notre histoire
        </h2>
        <VersionSwitcher active={active} onChange={setActive} />
      </header>

      {/* Texte — crossfade avec staggered paragraphs */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex flex-col gap-[0.8em] font-serif text-[12px] leading-normal text-justify text-stone-200 sm:gap-[1em] sm:text-sm sm:leading-normal"
        >
          {versions[active].paragraphs.map((p, i) => (
            <motion.p key={i} variants={paragraphVariants}>
              {p}
            </motion.p>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
