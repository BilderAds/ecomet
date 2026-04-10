"use client";

import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";

export function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const phi = useRef(4.5);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !isVisible) return;

    const shanghai: [number, number] = [31.23, 121.47];
    const shenzhen: [number, number] = [22.54, 114.06];
    const germany: [number, number] = [51.17, 10.45];
    const austria: [number, number] = [47.52, 14.55];
    const switzerland: [number, number] = [46.82, 8.23];

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 620 * 2,
      height: 620 * 2,
      phi: 4.5,
      theta: 0.15,
      dark: 1,
      diffuse: 2,
      mapSamples: 24000,
      mapBrightness: 3,
      baseColor: [0.08, 0.08, 0.08],
      markerColor: [0.95, 0.42, 0.17],
      glowColor: [0.12, 0.06, 0.02],
      markers: [
        { location: germany, size: 0.02 },
        { location: austria, size: 0.015 },
        { location: switzerland, size: 0.015 },
        { location: shanghai, size: 0.02 },
        { location: shenzhen, size: 0.02 },
      ],
      arcs: [
        { from: shanghai, to: germany, color: [0.95, 0.42, 0.17] },
        { from: shenzhen, to: germany, color: [0.85, 0.35, 0.14] },
        { from: shanghai, to: austria, color: [0.90, 0.38, 0.15] },
        { from: shenzhen, to: switzerland, color: [0.85, 0.35, 0.14] },
        { from: shanghai, to: switzerland, color: [0.90, 0.38, 0.15] },
      ],
      arcColor: [0.95, 0.42, 0.17],
      arcWidth: 0.4,
      arcHeight: 0.6,
      scale: 1.02,
      opacity: 0.9,
    });

    let animationId: number;

    function animate() {
      phi.current += 0.002;
      globe.update({ phi: phi.current });
      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      globe.destroy();
    };
  }, [isVisible]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: 620, height: 620, maxWidth: "100%", aspectRatio: "1" }}
    />
  );
}
