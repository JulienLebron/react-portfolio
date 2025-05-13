"use client";

import createGlobe from "cobe";
import { useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export function Globe({ className, lowPerformanceMode = false }) {
  const canvasRef = useRef(null);
  const pointerInteracting = useRef(null);
  const [mounted, setMounted] = useState(false);

  // Réduire la qualité et la complexité dans le mode économie de ressources
  const config = {
    width: lowPerformanceMode ? 400 : 800,
    height: lowPerformanceMode ? 400 : 800,
    devicePixelRatio: lowPerformanceMode ? 1 : 2,
    phi: 0,
    theta: 0.3,
    dark: 1,
    diffuse: 0.4,
    mapSamples: lowPerformanceMode ? 8000 : 16000,
    mapBrightness: 1.2,
    baseColor: [1, 1, 1],
    markerColor: [1, 1, 1],
    glowColor: [1, 1, 1],
    // Réduire le nombre de marqueurs en mode basse performance
    markers: lowPerformanceMode
      ? [
          { location: [19.076, 72.8777], size: 0.1 },
          { location: [39.9042, 116.4074], size: 0.08 },
          { location: [-23.5505, -46.6333], size: 0.1 },
          { location: [40.7128, -74.006], size: 0.1 },
        ]
      : [
          { location: [14.5995, 120.9842], size: 0.03 },
          { location: [19.076, 72.8777], size: 0.1 },
          { location: [23.8103, 90.4125], size: 0.05 },
          { location: [30.0444, 31.2357], size: 0.07 },
          { location: [39.9042, 116.4074], size: 0.08 },
          { location: [-23.5505, -46.6333], size: 0.1 },
          { location: [19.4326, -99.1332], size: 0.1 },
          { location: [40.7128, -74.006], size: 0.1 },
          { location: [34.6937, 135.5022], size: 0.05 },
          { location: [41.0082, 28.9784], size: 0.06 },
        ],
  };

  // Réduire la constante d'amortissement pour moins de calculs
  const MOVEMENT_DAMPING = lowPerformanceMode ? 2000 : 1400;

  let phi = 0;
  let width = 0;
  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: lowPerformanceMode ? 20 : 30, // Réduire la complexité de l'animation
    stiffness: lowPerformanceMode ? 80 : 100,
  });

  // Réduire la fréquence de mise à jour des interactions
  const updatePointerInteraction = (value) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  // Contrôle de rendu conditionnel
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let globeInstance = null;
    let animationFrameId = null;
    let rotationSpeed = lowPerformanceMode ? 0.003 : 0.005;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    // Réduire la fréquence de mise à jour du rendu
    const renderFrequency = lowPerformanceMode ? 2 : 1; // Ne rendre qu'une image sur 2 en mode basse performance
    let frameCount = 0;

    globeInstance = createGlobe(canvasRef.current, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender: (state) => {
        frameCount++;
        if (frameCount % renderFrequency !== 0) return;

        if (!pointerInteracting.current) phi += rotationSpeed;
        state.phi = phi + rs.get();
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    }, 0);

    return () => {
      if (globeInstance) globeInstance.destroy();
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted, rs, lowPerformanceMode]);

  if (!mounted) return <div className={className} />;

  return (
    <div
      className={twMerge(
        "mx-auto aspect-[1/1] w-full max-w-[600px]",
        className
      )}
    >
      <canvas
        className={twMerge(
          "size-full md:size-[24rem] lg:size-[28rem] opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}
