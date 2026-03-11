"use client";

import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export function HeroSection() {
  const scrollToExplore = () => {
    const section = document.getElementById("explore-section");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink px-6">
      {/* Tea steam area with cup and steam divs */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Simplified teacup outline - semi-circular cup opening */}
        <div className="relative z-10">
          <svg
            viewBox="0 0 120 80"
            className="h-24 w-36 text-paper/20 md:h-32 md:w-48"
            aria-hidden
          >
            {/* Cup body - simplified silhouette */}
            <path
              d="M 20 50 Q 60 70 100 50 L 95 75 Q 60 85 25 75 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Cup rim - semi-ellipse opening */}
            <path
              d="M 25 50 Q 60 35 95 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Steam divs with different delays and opacities */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="absolute h-8 w-8 rounded-full bg-paper/30 blur-xl animate-steam"
              style={{
                animationDelay: `${i * 0.6}s`,
                opacity: 0.4 - i * 0.04,
                left: `calc(50% + ${(i - 3) * 20}px)`,
                top: "calc(50% - 20px)",
              }}
              aria-hidden
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center">
        <motion.h1
          className="font-serif text-4xl font-medium tracking-tight text-paper md:text-6xl lg:text-7xl"
          initial="initial"
          animate="animate"
          variants={fadeIn}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          一片叶子的千年旅程
        </motion.h1>
        <motion.p
          className="mt-4 max-w-xl font-sans text-lg text-paper/80 md:text-xl"
          initial="initial"
          animate="animate"
          variants={fadeIn}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          探索云南普洱茶的历史、产区与风味
        </motion.p>
      </div>

      {/* Scroll down arrow */}
      <motion.button
        type="button"
        onClick={scrollToExplore}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-paper/60 transition-colors hover:text-paper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-label="向下滚动"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-10 w-10" strokeWidth={2} />
        </motion.div>
      </motion.button>
    </section>
  );
}
