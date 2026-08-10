import { Player } from "@lottiefiles/react-lottie-player";
import developerAnimation from "../assets/developerAnimation.json";
import Navbar from "../components/layout/Navbar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate=useNavigate();
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <section className="container max-w-7xl mx-auto px-6 lg:px-12">
        <div className="min-h-[calc(100vh-80px)] flex flex-col-reverse lg:flex-row items-center justify-center gap-12">
          {/* Left Section */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-mono text-violet-500">
              &lt;devHive/&gt;
            </h1>

            <h2 className="mt-6 text-4xl lg:text-5xl font-bold text-white leading-tight">
              Where Developers{" "}
              <motion.span
                initial={{ y: -200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1.2,
                  ease: "easeOut",
                }}
                className="text-violet-500 inline-block"
              >
                Build
              </motion.span>
              ,{" "}
              <motion.span
                initial={{ y: -150, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1.2,
                  delay: 1.3,
                  ease: "easeOut",
                }}
                className="text-violet-500 inline-block"
              >
                Connect
              </motion.span>
              {" & "}
              <motion.span
                initial={{ y: -150, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1.2,
                  delay: 2.6,
                  ease: "easeOut",
                }}
                className="text-violet-500 inline-block"
              >
                Grow
              </motion.span>
              {" Together."}
            </h2>

            <p className="mt-6 text-gray-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
              Showcase projects, join communities, collaborate with developers
              worldwide, and grow your network.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button onClick={
              ()=>navigate("/register")
              } className="bg-violet-600 hover:bg-violet-700 transition px-6 py-3 rounded-lg text-white font-medium">
                Get Started
              </button>

              <button className="border border-violet-500 text-violet-500 hover:bg-violet-500 hover:text-white transition px-6 py-3 rounded-lg font-medium">
                Explore Projects
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="w-[280px] sm:w-[380px] lg:w-[500px] drop-shadow-[0_0_40px_rgba(168,85,247,0.5)]">
              <Player
                autoplay
                loop
                src={developerAnimation}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      
      </section>
    </div>
  );
};

export default Home;
