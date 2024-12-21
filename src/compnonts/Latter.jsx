import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import video from "../asset/Happy Birthday to You - piano instrumental with lyrics.mp4"

gsap.registerPlugin(ScrollTrigger);

export default function Latter() {
  const wrapperRef = useRef(null);
  const cardsRef = useRef([]);
  const videoRef = useRef(null); // Ref for the hidden video
  const [isMuted, setIsMuted] = useState(true); // State for sound control

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const cards = cardsRef.current;
    const animation = gsap.timeline();
    let cardHeight = 0;
    const headerHeight = wrapper?.children[0]?.offsetHeight || 0;

    const initCards = () => {
      if (!cards.length) return;

      animation.clear();
      cardHeight = cards[0]?.offsetHeight || 0;
      cards.forEach((card, index) => {
        if (card && index > 0) {
          gsap.set(card, { y: index * cardHeight });
          animation.to(card, { y: 0, duration: index * 0.5, ease: "none" }, 0);
        }
      });
    };

    initCards();

    const scrollTrigger = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      pin: true,
      end: () => `+=${cards.length * cardHeight + headerHeight}`,
      scrub: true,
      animation: animation,
      markers: false,
      invalidateOnRefresh: true,
    });

    ScrollTrigger.addEventListener("refreshInit", initCards);

    return () => {
      scrollTrigger.kill();
      ScrollTrigger.removeEventListener("refreshInit", initCards);
    };
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };


  const latter = [
    { text: "My dearest friend,", rotation: "rotate-[4deg]", bgColor: "bg-pink-300", textColor: "text-pink-800", font: "font-script" },
    { text: "Every moment spent with you feels like a blessing, a cherished gift that life has granted me. 🎁 On this special day, I not only celebrate your birthday 🎂 but also honor the beautiful soul you are. 🌟", bgColor: "bg-blue-100", textColor: "text-blue-800", font: "font-handwritten" },
    { text: "Your unwavering positivity and boundless energy inspire me in ways words cannot express. 🌈 You have a unique ability to turn ordinary moments into extraordinary memories, and your presence brings comfort and joy that I treasure deeply.", bgColor: "bg-green-100", textColor: "text-green-800", font: "font-cursive" },
    { text: "As you step into another remarkable year of your life, I wish you all the happiness 🌼 and success 🏆 that your heart can hold. You deserve the world and more 🌍 for the incredible person you are.", bgColor: "bg-purple-300", textColor: "text-purple-800", font: "font-elegant" },
    { text: "With all my gratitude\nYour forever friend ❤️", bgColor: "bg-yellow-100", textColor: "text-yellow-800", font: "font-romantic" },
  ];

  const generateLatterWithRotation = (latter) =>
    latter.map((item, index) => ({
      ...item,
      rotation: (index % 2 === 0 ? 1 : -1) * (1 + index * 1),
    }));

  const rotatedLatter = generateLatterWithRotation(latter);


  
  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      // Attempt to play video with sound on load
      video.muted = false;
      video.volume = 1;
      const playPromise = video.play();

      // Handle play promise rejection
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Video playing with sound!");
          })
          .catch((error) => {
            console.warn("Autoplay with sound failed. Muting video.", error);
            video.muted = true;
            video.play();
          });
      }
    }
  }, []);

  return (
    <>
   <div>
      <video
        ref={videoRef}
        src={video}
        autoPlay
        loop
        controls
        className="w-full h-auto hidden"
      />
    </div>

      {/* Main Content */}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 md:p-12 mb-12">
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

          <div ref={wrapperRef} className="relative py-20 mt-10">
            <div className="relative h-[60vh] w-full md:w-[30%]">
              {rotatedLatter.map(({ text, bgColor, textColor, font, rotation }, index) => (
                <div
                  key={index}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className={`absolute w-full h-72 px-6 py-4 flex items-center justify-center rounded-3xl text-left ${bgColor} ${textColor} ${font} shadow-lg transform transition-all duration-300 hover:scale-105 text-balance text-center`}
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  <p className="text-lg leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <footer className="text-center text-gray-600 text-2xl">
            <p className="mb-4">Made by Me for you</p>
          </footer>
        </div>
      </div>

      {/* Fixed Bottom Sound Control */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-pink-600 text-white px-4 py-2 rounded-full shadow-lg">
        <button
          onClick={toggleMute}
          className="text-base"
        >
       Sounds  {isMuted ? "🔇" : "🔊"}
        </button>
      </div>
    </>
  );
}


