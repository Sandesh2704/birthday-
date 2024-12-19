
import { motion } from 'framer-motion';
import './App.css';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useEffect, useRef } from 'react';
import { gsap } from "gsap";
gsap.registerPlugin();

function App() {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current;
    const animation = gsap.timeline({ defaults: { duration: 1, ease: "Power2.out" } });

    function initCards() {
      animation.clear();
      cards.forEach((card, index) => {
        gsap.set(card, {
          position: "absolute",
          top: 0,
          left: 0,
          y: index * 50,
          opacity: index === 0 ? 1 : 0,
          zIndex: cards.length - index,
        });
      });
    }

    initCards();
  }, []);

  return (
    <div className="App bg-gradient-to-b from-pink-100 to-purple-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <motion.div
            className="inline-block"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <i className="fas fa-heart text-5xl text-red-400 mb-4"></i>
          </motion.div>
          <motion.h1
            className="font-dancing text-5xl md:text-7xl text-custom mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            Happy Birthday!
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            To my dearest friend
          </motion.p>
        </header>

        <motion.main
          className="relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 md:p-12 mb-12"
            variants={itemVariants}
          >
            <div className="text-center mb-8">
              <DotLottieReact
                src="https://lottie.host/2b531185-5481-4614-959d-f68204ea3dcb/uucdJnb8Xz.lottie"
                className="w-64 h-64 mx-auto mb-8 object-contain"
                loop
                autoplay
              />

              <h2 className="font-dancing text-3xl md:text-4xl text-custom mb-6">To My Closest Friend</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                On your special day, I want you to know how much you mean to me. You light up my life in countless ways, and your friendship is the most precious gift I could ever ask for.
              </p>

            </div>
          </motion.div>
        </motion.main>

        <motion.div
  className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 md:p-12 mb-12"
  variants={itemVariants}
>
  <div className="text-left italic">
    <p className="text-gray-600 leading-relaxed mb-4">
      My dearest friend, 
    </p>
    <p className="text-gray-600 leading-relaxed mb-4">
      Every moment spent with you feels like a blessing, a cherished gift that life has granted me. 🎁 On this special day, I not only celebrate your birthday 🎂 but also honor the beautiful soul you are. 🌟 You radiate kindness, compassion, and strength, lighting up the lives of everyone fortunate enough to know you. ✨
    </p>
    <p className="text-gray-600 leading-relaxed mb-4">
      Your unwavering positivity and boundless energy inspire me in ways words cannot express. 🌈 You have a unique ability to turn ordinary moments into extraordinary memories, and your presence brings comfort and joy that I treasure deeply. 
    </p>
    <p className="text-gray-600 leading-relaxed mb-4">
      As you step into another remarkable year of your life, I wish you all the happiness 🌼 and success 🏆 that your heart can hold. You deserve the world and more 🌍 for the incredible person you are. May this year bring you closer to your dreams 🌠 and fill your days with endless smiles 😄 and laughter 😂.
    </p>
    <p className="text-gray-600 leading-relaxed mb-4">
      Here’s to countless more shared laughs 😄, heartfelt conversations 🗨️, and moments of pure joy. 🌸 You are not just my friend but a source of strength 💪 and inspiration 🌟, someone I hold close to my heart. 💝 Happy Birthday, my dear friend. 🎉🎈 May this day be as magical ✨ and unforgettable as you are to me. 🌹
    </p>
    <p className="text-gray-600 leading-relaxed">
      With all my gratitude,  <br /> Your forever friend 
    </p>
  </div>
</motion.div>

        <footer className="text-center text-gray-600 mt-12">
          <p className="mb-4">Made with  ❤️ for you</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
