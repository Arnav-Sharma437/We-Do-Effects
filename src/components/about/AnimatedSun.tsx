'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedSun = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-10">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
        className="w-[80vw] h-[80vw] max-w-[1200px] max-h-[1200px] rounded-full border-[1px] border-accent/20 flex items-center justify-center"
      >
        <div className="w-[85%] h-[85%] rounded-full border-[1px] border-accent/30 flex items-center justify-center">
          <div className="w-[70%] h-[70%] rounded-full border-[1px] border-accent/40 bg-gradient-radial from-accent/5 to-transparent" />
        </div>
      </motion.div>
    </div>
  );
};
