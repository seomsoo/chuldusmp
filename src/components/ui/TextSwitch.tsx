"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

interface TextSwitchProps {
  texts: string[];
  interval?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function TextSwitch({
  texts,
  interval = 2500,
  className,
  style,
}: TextSwitchProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, interval);
    return () => clearInterval(timer);
  }, [texts.length, interval]);

  return (
    <span className={`relative inline-grid ${className ?? ""}`} style={style}>
      {texts.map((t) => (
        <span key={t} className="invisible col-start-1 row-start-1" aria-hidden>
          {t}
        </span>
      ))}

      <AnimatePresence mode="wait">
        <motion.span
          key={texts[index]}
          initial={{ opacity: 0, filter: "blur(12px)", scale: 0.95 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          exit={{ opacity: 0, filter: "blur(12px)", scale: 1.05 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="col-start-1 row-start-1"
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
