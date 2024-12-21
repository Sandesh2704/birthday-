import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Latter from './compnonts/Latter';
export default function App() {
  const [countdown, setCountdown] = useState(5); // Countdown starts from 5
  const [showLatter, setShowLatter] = useState(false); // Toggle letter display

  const emojis = [
    "🎉", // 5
    "🎂", // 4
    "🎁", // 3
    "🌟", // 2
    "❤️"  // 1
  ];

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000); // Decrease countdown every second
      return () => clearTimeout(timer); // Cleanup timer
    } else {
      setShowLatter(true); // Show the letter after countdown finishes
    }
  }, [countdown]);

  return (
    <div className="App">
      {showLatter ? (
        <Latter />
      ) : (
        <div className=" bg-gradient-to-b from-pink-200 to-purple-200 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <motion.div
              key={countdown}
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1.5, rotate: 360 }}
              exit={{ scale: 0, rotate: -360 }}
              transition={{ duration: 1 }}
              className="text-9xl"
            >
              {emojis[5 - countdown]} {/* Display emoji based on countdown */}
            </motion.div>

            <motion.p
              className="text-4xl mt-8 font-bold text-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {countdown}
            </motion.p>
          </div>
        </div>
      )}
    </div>

  );
}


