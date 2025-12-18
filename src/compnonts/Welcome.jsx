"use client";
import { motion } from "framer-motion";

export default function Welcome({ countdown, handleOpen }) {
  const emojis = ["✨","🎂","🌹","🎁","❤️"];

  return (
    <motion.div
      className="w-full max-w-xl bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl p-8 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="mx-auto w-36 h-36 rounded-full flex items-center justify-center text-6xl bg-gradient-to-br from-pink-200 to-rose-200 shadow-inner"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        {emojis[Math.max(0, Math.min(emojis.length - 1, 5 - countdown))]}
      </motion.div>

      <h1 className="mt-6 text-3xl font-semibold text-gray-800">
        A little surprise for you
      </h1>
      <p className="mt-2 text-gray-600">
        I made something special — open the letter when you're ready.
      </p>

      <div className="mt-6 flex items-center justify-center space-x-4">
        <motion.button
          onClick={handleOpen}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="px-6 py-2 bg-rose-500 text-white rounded-full shadow-md"
        >
          Open Now
        </motion.button>

        <div className="text-sm text-gray-500">
          Auto opens in <span className="font-medium">{countdown}</span>
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-400">
        Made with thoughtfulness ♥
      </p>
    </motion.div>
  );
}
