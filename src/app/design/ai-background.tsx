"use client";

import { NeuralCanvas } from "./neural-canvas";
import { SignalPulses } from "./signal-pulses";

export function AIBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* DARK ENERGY BASE */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at top, #120b2e 0%, #05010d 45%, #02010a 100%)",
        }}
      />

      {/* NEURAL DATA FEED */}
      <NeuralCanvas />

      {/* SIGNAL PULSES */}
      <SignalPulses />
    </div>
  );
}
