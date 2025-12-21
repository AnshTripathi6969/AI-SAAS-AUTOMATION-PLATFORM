"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function GsapTitleHover({
  text,
}: {
  text: string;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const idleTl = useRef<gsap.core.Timeline | null>(null);

  // 🌈 Idle breathing + gradient glow cycling (UNCHANGED)
  useEffect(() => {
    const letters = containerRef.current?.querySelectorAll(".char");
    if (!letters) return;

    idleTl.current = gsap.timeline({
      repeat: -1,
      defaults: { ease: "sine.inOut" },
    });

    idleTl.current
      // Purple phase
      .to(letters, {
        y: -4,
        textShadow: `
          0 0 14px rgba(168,85,247,0.75),
          0 0 34px rgba(168,85,247,0.55),
          0 0 70px rgba(168,85,247,0.4)
        `,
        duration: 3,
        stagger: { each: 0.1, from: "center" },
      })
      // Blue phase
      .to(letters, {
        y: 0,
        textShadow: `
          0 0 14px rgba(59,130,246,0.75),
          0 0 34px rgba(59,130,246,0.55),
          0 0 70px rgba(59,130,246,0.4)
        `,
        duration: 3,
        stagger: { each: 0.1, from: "center" },
      })
      // Cyan phase
      .to(letters, {
        y: -3,
        textShadow: `
          0 0 14px rgba(34,211,238,0.75),
          0 0 34px rgba(34,211,238,0.55),
          0 0 70px rgba(34,211,238,0.4)
        `,
        duration: 3,
        stagger: { each: 0.1, from: "center" },
      });
  }, []);

  return (
    <span
      ref={containerRef}
      className="inline-flex pointer-events-auto select-none cursor-default"
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="char inline-block will-change-transform"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
