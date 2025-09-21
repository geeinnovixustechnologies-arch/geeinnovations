"use client";

import { motion } from "framer-motion";

export default function ProgressBar({ progress, sections = [] }) {
  const percentage = Math.round(progress);

  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
      <motion.div
        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
}
