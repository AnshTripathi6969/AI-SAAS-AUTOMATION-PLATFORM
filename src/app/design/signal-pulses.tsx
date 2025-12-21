"use client";

import { useEffect, useState } from "react";

type Pulse = {
  id: number;
  x: number;
  y: number;
};

export function SignalPulses() {
  const [pulses, setPulses] = useState<Pulse[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulses((p) => [
        ...p.slice(-8),
        {
          id: Math.random(),
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        },
      ]);
    }, 500 + Math.random() * 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {pulses.map((p) => (
        <span
          key={p.id}
          className="absolute h-2 w-2 rounded-full"
          style={{
            left: p.x,
            top: p.y,
            background:
              "radial-gradient(circle, rgba(34,211,238,0.8), rgba(34,211,238,0))",
            animation: "pulse 1.8s ease-out forwards",
          }}
        />
      ))}

      <style jsx>{`
        @keyframes pulse {
          from {
            transform: scale(0.4);
            opacity: 0.9;
          }
          to {
            transform: scale(3);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
