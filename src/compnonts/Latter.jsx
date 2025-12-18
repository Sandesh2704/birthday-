import { use, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import audioFile from "../asset/a-birthday-to-remember-201324.mp3";

export default function Latter({ isAutoOpened = false }) {
  const [linesVisible, setLinesVisible] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  const lines = [
    "Happy Birthday.",
    "Another year has passed, and you continue to be someone rare and unforgettable.",
    "You carry a softness that doesn't make you weak, a quiet strength, and a kindness that feels like calm water.",
    "I hope this new chapter brings you stories worth sharing, people who truly understand you, and moments that remind you how beautiful your journey already is.",
    "You deserve peace in your heart, love that feels gentle, dreams that feel possible, and smiles that arrive without effort.",
    "Thank you for being the kind of person who adds colour to other people's days, often without even realising it.",
    "We don't talk much anymore, and maybe I'm easy to forget — but trust me, I never forgot you.",
    "Even with distance and silence, the respect and care I have for you never changed.",
    "May this year bring warmth, comfort, small surprises, and a little bit of magic into your everyday life.",
    "And even from far away, I'm quietly cheering for you — always wishing you the best.",
    "Happy Birthday, again."
  ];


  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay was prevented, but we can ignore this
          });
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Sequentially reveal each line, then type it out for a gentle effect
  useEffect(() => {
    let mounted = true;
    const reveal = async () => {
      for (let i = 0; i < lines.length; i++) {
        if (!mounted) return;
        setLinesVisible(i + 1);
        // type the line
        setTypedText("");
        const text = lines[i];
        for (let k = 0; k <= text.length; k++) {
          if (!mounted) return;
          setTypedText(text.slice(0, k));
          // speed up for punctuation
          await new Promise((r) => setTimeout(r, 18 + (text[k] === ' ' ? 0 : 6)));
        }
        // pause before next line
        await new Promise((r) => setTimeout(r, 700));
      }
    };

    reveal();

    // Try to play gentle background audio
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.18;
      
      // Handle autoplay differently based on how letter was opened
      if (isAutoOpened) {
        // For auto-open, wait a bit before playing to avoid autoplay restrictions
        setTimeout(() => {
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Autoplay was prevented, user will need to click play button
              setIsPlaying(false);
            });
          }
        }, 500);
      } else {
        // For manual open, try playing immediately
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay was prevented
            setIsPlaying(false);
          });
        }
      }
    }

    return () => { 
      mounted = false; 
    };
  }, [isAutoOpened]);

  return (
    <div className="min-h-screen flex items-center justify-center py-6   relative">
      <audio ref={audioRef} src={audioFile} loop />
      
      {/* Audio Control Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        onClick={toggleAudio}
          className="fixed bottom-6 z-50 right-6 bg-rose-500 text-white px-4 py-2 rounded-full shadow-lg text-sm"
      whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
      

         {isPlaying ? "Pause Music" : "Play Music"}
      </motion.button>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="py-8 px-4 md:py-12">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-rose-600">For You</h2>
              <p className="text-sm text-gray-500 mt-1">A small, honest note — wrapped with care.</p>
            </div>
            <div className="text-2xl">🎈</div>
          </div>

          <div className="mt-8 grid gap-4">
            <div className="text-gray-700 text-lg leading-relaxed">
              {/* Show the typed text as it appears. Keep the previous lines that finished fully visible. */}
              {lines.slice(0, linesVisible - 1).map((l, i) => (
                <motion.p key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }} className="mb-3">
                  {l}
                </motion.p>
              ))}

              {/* Current typing line */}
              {linesVisible > 0 && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.18 }} className="mb-3 text-justify">
                  {typedText}
                  <span className="inline-block w-1 h-6 align-middle bg-gray-700 ml-1 animate-blink" />
                </motion.p>
              )}
            </div>

            <div className="mt-6">
              <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 text-sm text-gray-600">
                Always cheering for you, in all the big and small moments.
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-500">From someone who never forgot.</div>
              <div className="text-sm text-gray-500 text-end">— With warmth</div>
            </div>
          </div>
        </div>
      </motion.div>

      <style>{`@keyframes blink { 0% { opacity: 1 } 50% { opacity: 0 } 100% { opacity: 1 } } .animate-blink { animation: blink 1s linear infinite; }`}</style>
    </div>
  );
}
