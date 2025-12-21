"use client";

import { useEffect, useRef } from "react";

type Line = {
  x: number;
  y: number;
  angle: number;
  speed: number;
  life: number;
};

export function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lines = useRef<Line[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const createLine = (): Line => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      angle: Math.random() * Math.PI * 2,
      speed: 0.3 + Math.random() * 0.6,
      life: 200 + Math.random() * 200,
    });

    lines.current = Array.from({ length: 40 }, createLine);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      lines.current.forEach((l) => {
        const x2 = l.x + Math.cos(l.angle) * 12;
        const y2 = l.y + Math.sin(l.angle) * 12;

        ctx.beginPath();
        ctx.moveTo(l.x, l.y);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = "rgba(168,85,247,0.35)";
        ctx.lineWidth = 1;
        ctx.stroke();

        l.x = x2;
        l.y = y2;
        l.life--;

        if (
          l.life <= 0 ||
          l.x < 0 ||
          l.y < 0 ||
          l.x > canvas.width ||
          l.y > canvas.height
        ) {
          Object.assign(l, createLine());
        }
      });

      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-60"
    />
  );
}
