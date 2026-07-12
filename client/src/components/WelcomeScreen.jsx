import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Bus, Route, Users, BarChart2, ArrowRight } from 'lucide-react';
import splashHero from '../assets/transitops_bus_hero.png';

// High-fidelity custom TransitOps Logo Mark - takes custom text-color classes
export const TransiOpsLogo = ({ className = "w-12 h-12 text-[#5D3F58]" }) => (
  <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M41.8 21.5 C43.2 21.5, 44.5 22.8, 44 24.8 L34.5 61 C32 70.8, 25.5 76, 17.5 76 C10.2 76, 7.5 71, 9 64.5 L17.5 31.5 C18.5 27.5, 21.8 24.5, 26 24.5 H37 Z" />
    <path fill="currentColor" d="M46.2 21.5 H74 C79.5 21.5, 82.5 24.8, 81.8 30 L78 52 C77.2 56.5, 73.5 59, 69.5 57.2 C65.5 55.5, 64.8 51.5, 65.5 47 L67.5 33.5 H49.2 C46.2 33.5, 44.5 31, 45 28.5 C45.5 26, 47.8 21.5, 49.2 21.5 Z" />
  </svg>
);

export default function WelcomeScreen() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Fleet Management",
      icon: Bus,
    },
    {
      title: "Trip Management",
      icon: Route,
    },
    {
      title: "Driver Management",
      icon: Users,
    },
    {
      title: "Analytics & Reports",
      icon: BarChart2,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="w-screen h-screen min-h-screen max-h-screen flex flex-col justify-between relative overflow-hidden font-sans text-slate-100"
      style={{ background: 'linear-gradient(160deg, #1a0d2e 0%, #2d1b4e 25%, #3d2060 45%, #2a1545 65%, #1e1035 80%, #150b28 100%)' }}
    >
      {/* Decorative premium pulsing background glows */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.25, 0.4, 0.25],
          x: [0, 15, 0],
          y: [0, -15, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: 'easeInOut'
        }}
        className="absolute top-[-20%] left-[-20%] w-[70%] h-[70%] rounded-full bg-[#7c3aed]/20 blur-[130px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.3, 0.15],
          x: [0, -20, 0],
          y: [0, 20, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: 'easeInOut'
        }}
        className="absolute bottom-[-20%] right-[-20%] w-[70%] h-[70%] rounded-full bg-[#c084fc]/15 blur-[130px] pointer-events-none"
      />

      {/* Floating Sparkles / Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
        {[
          { top: '15%', left: '10%', size: 4, delay: 0 },
          { top: '40%', left: '85%', size: 6, delay: 1.5 },
          { top: '75%', left: '20%', size: 5, delay: 3 },
          { top: '60%', left: '70%', size: 4, delay: 2.2 },
          { top: '25%', left: '75%', size: 5, delay: 0.7 },
        ].map((p, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              delay: p.delay,
              ease: 'easeInOut'
            }}
            className="absolute rounded-full bg-white"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              boxShadow: '0 0 10px rgba(255,255,255,0.8)'
            }}
          />
        ))}
      </div>

      {/* 1. Large full-width illustration container (55-60% height) with smooth bottom fading mask */}
      <div 
        className="w-full h-[55vh] flex items-center justify-center relative overflow-hidden select-none pointer-events-none mt-2 z-10"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)'
        }}
      >
        <motion.div
          animate={{
            y: [0, -10, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: 'easeInOut'
          }}
          className="flex items-center justify-center w-full h-full"
        >
          <img
            src={splashHero}
            alt="TransitOps Premium Transit Illustration"
            className="max-h-full max-w-[95%] w-auto h-auto object-contain drop-shadow-[0_25px_60px_rgba(153,101,138,0.25)]"
          />
        </motion.div>
      </div>

      {/* 2. Logo & Branding Details */}
      <div className="flex flex-col items-center text-center px-6 mt-1 z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center justify-center space-x-3 mb-1"
        >
          <TransiOpsLogo className="w-10 h-10 text-[#DCCFD9] drop-shadow-[0_0_8px_rgba(220,207,217,0.4)]" />
          <span className="text-[32px] font-extrabold tracking-tight text-white font-sans drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
            TransitOps
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-xs font-semibold tracking-widest text-[#DCCFD9] uppercase flex items-center space-x-2 opacity-90"
        >
          <span>Smart Transit</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#99658A] shadow-[0_0_6px_#99658A]"></span>
          <span>Better Operations</span>
        </motion.div>
      </div>

      {/* 3. Rounded feature cards in a single row (Glassmorphism design) */}
      <div className="w-full max-w-3xl mx-auto px-6 py-4 z-10">
        <div className="grid grid-cols-4 gap-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.1, duration: 0.4 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  whileHover={{ scale: 1.06, y: -4, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  whileTap={{ scale: 0.96 }}
                  className="w-16 h-16 bg-white/5 border border-white/10 text-[#DCCFD9] rounded-2xl flex items-center justify-center mb-2 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] backdrop-blur-md hover:border-[#99658A]/50 hover:shadow-[0_0_15px_rgba(153,101,138,0.25)] transition-all duration-300 cursor-pointer group"
                >
                  <Icon className="w-6 h-6 group-hover:scale-110 group-hover:text-white transition-all duration-300" />
                </motion.div>
                <span className="text-[10px] font-bold text-[#E6DCE8] text-center tracking-tight leading-[1.3] max-w-[80px]">
                  {feature.title}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 4. Large rounded CTA button with glowing gradient at the bottom */}
      <div className="w-full max-w-md mx-auto px-6 pb-8 z-10">
        <motion.button
          whileHover={{ scale: 1.01, translateY: -2 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => navigate('/auth')}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#5D3F58] via-[#714B67] to-[#99658A] hover:brightness-110 text-white font-bold text-sm shadow-[0_8px_30px_rgba(113,75,103,0.35)] hover:shadow-[0_8px_35px_rgba(153,101,138,0.55)] transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer group relative overflow-hidden"
        >
          {/* Internal gradient shine animation */}
          <motion.div
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: 'linear',
              repeatDelay: 2
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 pointer-events-none"
          />
          <span className="relative z-10">Get Started</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200 relative z-10" />
        </motion.button>
      </div>

      {/* Premium line art wave */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none overflow-hidden z-0 opacity-15">
        <svg className="w-full h-full text-white" viewBox="0 0 420 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M-20 60 C 80 40, 140 70, 200 45 C 280 15, 340 65, 440 30"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <path
            d="M-20 50 C 60 25, 120 75, 220 35 C 300 0, 360 55, 440 20"
            stroke="currentColor"
            strokeWidth="0.75"
          />
        </svg>
      </div>
    </motion.div>
  );
}
