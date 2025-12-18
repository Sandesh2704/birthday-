import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Latter from "./compnonts/Latter";

export default function App() {
  const [countdown, setCountdown] = useState(5); // gentle auto-opening countdown
  const [showLatter, setShowLatter] = useState(false);
  const [isAutoOpened, setIsAutoOpened] = useState(false);

  useEffect(() => {
    if (showLatter) return; // don't run when letter is open
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(t);
    }
    setIsAutoOpened(true);
    // setShowLatter(true);
  }, [countdown, showLatter]);

  const handleOpen = () => {
    setIsAutoOpened(false);
    setShowLatter(true);
  };

  const emojis = ["✨","🎂","🌹","🎁","❤️"];

  return (
    <div className="min-h-screen px-5 bg-gradient-to-b from-[#f8b5d0]   via-[#e3cce8] to-[#ff9fd4] flex items-center justify-center py-6 ">
      {showLatter ? (
        <Latter isAutoOpened={isAutoOpened} />
      ) : (
        <motion.div
          className="w-full max-w-xl bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl py-8 px-4 text-center"
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

          <h1 className="mt-6 text-3xl font-semibold text-gray-800">A little surprise for you</h1>
          <p className="mt-2 text-gray-600">I made something special — open the letter when you're ready.</p>

          <div className="mt-6 flex items-center justify-center space-x-4">
            <motion.button
              onClick={handleOpen}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-2 bg-rose-500 text-white rounded-full shadow-md"
            >
              Open Now
            </motion.button>

            {/* <div className="text-sm text-gray-500">Auto opens in <span className="font-medium">{countdown}</span></div> */}
          </div>

          <p className="mt-4 text-xs text-gray-400">Made with thoughtfulness ♥</p>
        </motion.div>
      )}
    </div>
  );
}