"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { AppStoreButton, PlayStoreButton } from "@/components/shared";
import { heroDetails } from "@/data/hero";

const Hero: React.FC = () => {
  const words = heroDetails.rotatingWords;
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (!words.length) return;
    const timer = window.setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 1800);
    return () => window.clearInterval(timer);
  }, [words.length]);

  return (
    <section id="hero" className="relative flex items-center justify-center pb-0 pt-32 md:pt-40 px-5">
      <div className="absolute left-0 top-0 bottom-0 -z-10 w-full">
        <div className="absolute inset-0 h-full w-full bg-hero-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
        <svg
          className="pointer-events-none absolute bottom-0 left-0 z-0 h-[min(52vh,440px)] w-[min(92vw,560px)] max-w-full select-none"
          viewBox="0 0 560 420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMinYMax meet"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="heroAbstractBl1" x1="0" y1="420" x2="420" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0ea5e9" stopOpacity="0.32" />
              <stop offset="0.45" stopColor="#22c55e" stopOpacity="0.22" />
              <stop offset="1" stopColor="#6366f1" stopOpacity="0.14" />
            </linearGradient>
            <linearGradient id="heroAbstractBl2" x1="120" y1="440" x2="360" y2="120" gradientUnits="userSpaceOnUse">
              <stop stopColor="#22d3ee" stopOpacity="0.2" />
              <stop offset="1" stopColor="#34d399" stopOpacity="0.12" />
            </linearGradient>
          </defs>
          <path d="M-60 460C40 300 160 220 280 260C400 300 520 380 580 460H-60Z" fill="url(#heroAbstractBl1)" />
          <path d="M-40 440C80 340 140 280 220 300C320 324 420 400 500 460H-40Z" fill="url(#heroAbstractBl2)" opacity="0.85" />
          <path d="M20 400C100 320 180 280 260 300C360 328 460 400 520 460H20Z" stroke="rgba(255,255,255,0.35)" strokeWidth="1" fill="none" />
        </svg>
        <svg
          className="pointer-events-none absolute top-0 right-0 z-0 h-[min(42vh,360px)] w-[min(75vw,440px)] max-w-full select-none"
          viewBox="0 0 480 360"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMaxYMin meet"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="heroAbstractTr1" x1="480" y1="0" x2="80" y2="320" gradientUnits="userSpaceOnUse">
              <stop stopColor="#818cf8" stopOpacity="0.22" />
              <stop offset="0.5" stopColor="#0ea5e9" stopOpacity="0.18" />
              <stop offset="1" stopColor="#2dd4bf" stopOpacity="0.12" />
            </linearGradient>
            <linearGradient id="heroAbstractTr2" x1="360" y1="-20" x2="200" y2="280" gradientUnits="userSpaceOnUse">
              <stop stopColor="#a78bfa" stopOpacity="0.16" />
              <stop offset="1" stopColor="#38bdf8" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path d="M520-40C440 40 360 100 280 80C180 56 80-20 0-40H520Z" fill="url(#heroAbstractTr1)" />
          <path d="M500-20C420 60 340 120 260 108C160 92 60 20-20-20H500Z" fill="url(#heroAbstractTr2)" opacity="0.9" />
          <circle cx="380" cy="100" r="120" stroke="rgba(255,255,255,0.22)" strokeWidth="0.8" fill="none" />
          <circle cx="400" cy="88" r="88" stroke="rgba(14,165,233,0.15)" strokeWidth="0.6" fill="none" />
        </svg>
      </div>

      <div className="absolute left-0 right-0 bottom-0 backdrop-blur-[2px] h-40 bg-gradient-to-b from-transparent via-[rgba(233,238,255,0.5)] to-[rgba(202,208,230,0.5)]"></div>

      <div className="text-center">
        <h1 className="text-4xl md:text-6xl md:leading-tight font-bold text-foreground max-w-lg md:max-w-2xl mx-auto">
          <span className="block [perspective:1000px]">
            <span className="inline-block min-w-[7ch] bg-blue-600 px-3 py-1 text-white rounded-sm">
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[wordIndex]}
                  className="inline-block [transform-style:preserve-3d]"
                  initial={{ opacity: 0, rotateX: 90 }}
                  animate={{ opacity: 1, rotateX: [90, 0, 360] }}
                  exit={{ opacity: 0, rotateX: -90 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  {words[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </span>
          <span className="mt-2 block">{heroDetails.headingTail}</span>
        </h1>
        <p className="mt-4 text-foreground max-w-lg mx-auto">{heroDetails.subheading}</p>
        <div className="mt-6 flex flex-col sm:flex-row items-center sm:gap-4 w-fit mx-auto">
          <AppStoreButton dark />
          <PlayStoreButton dark />
        </div>
        <Image
          src={heroDetails.centerImageSrc}
          width={384}
          height={340}
          quality={100}
          sizes="(max-width: 768px) 100vw, 384px"
          priority={true}
          unoptimized={true}
          alt="app mockup"
          className="relative mt-12 md:mt-16 mx-auto z-10"
        />
      </div>
    </section>
  );
};

export default Hero;

