import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TransiOpsLogo } from './WelcomeScreen';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

export default function AuthLayout() {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    navigate('/dashboard');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden font-sans"
      style={{ background: 'linear-gradient(135deg, #f3eef8 0%, #ede5f5 30%, #e8daf4 60%, #f0e9f9 100%)' }}
    >
      {/* Decorative premium background glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-accent/25 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-primary/10 blur-[120px] pointer-events-none" />

      {/* Main card container - NO hero image banner */}
      <div className="w-full max-w-[440px] bg-white border border-brand-border rounded-3xl shadow-[0_20px_50px_rgba(93,63,88,0.05)] flex flex-col overflow-hidden relative p-8 z-10">
        
        {/* Large Brand Header with Logo and App Name */}
        <div className="w-full flex flex-col items-center text-center pb-6">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-3"
          >
            <TransiOpsLogo className="w-16 h-16 text-[#5D3F58] drop-shadow-[0_4px_12px_rgba(93,63,88,0.1)]" />
          </motion.div>
          
          <span className="text-[28px] font-extrabold tracking-tight text-brand-text mb-1">
            TransitOps
          </span>

          <h2 className="text-xl font-bold text-brand-text tracking-tight mt-1">
            Welcome Back
          </h2>
          <p className="text-xs text-brand-muted font-medium mt-1">
            Manage transit operations, dispatch routes, and track fleet drivers.
          </p>
        </div>

        {/* Custom Tab Switcher */}
        <div className="w-full mb-6 z-20">
          <div className="flex bg-[#F1EDF2] p-1 rounded-2xl relative">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-3 text-xs font-bold text-center rounded-xl relative z-10 transition-colors duration-300 cursor-pointer ${
                activeTab === 'login' ? 'text-brand-text' : 'text-brand-muted hover:text-brand-text'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-3 text-xs font-bold text-center rounded-xl relative z-10 transition-colors duration-300 cursor-pointer ${
                activeTab === 'signup' ? 'text-brand-text' : 'text-brand-muted hover:text-brand-text'
              }`}
            >
              Sign Up
            </button>

            {/* Sliding Highlight Indicator */}
            <motion.div
              layoutId="authTabIndicator"
              className="absolute top-1 bottom-1 left-1 bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
              style={{
                width: 'calc(50% - 6px)',
              }}
              animate={{
                x: activeTab === 'login' ? 0 : '100%',
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            />
          </div>
        </div>

        {/* Dynamic Form content area */}
        <div className="w-full relative z-20">
          <AnimatePresence mode="wait">
            {activeTab === 'login' ? (
              <motion.div
                key="login"
                initial={{ x: -12, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 12, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                <LoginForm
                  onSwitchTab={() => setActiveTab('signup')}
                  onSubmitSuccess={handleAuthSuccess}
                />
              </motion.div>
            ) : (
              <motion.div
                key="signup"
                initial={{ x: 12, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -12, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                <SignupForm
                  onSwitchTab={() => setActiveTab('login')}
                  onSubmitSuccess={handleAuthSuccess}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Subtle bottom styling lines */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none overflow-hidden z-0 opacity-20">
        <svg className="w-full h-full text-brand-primary/10" viewBox="0 0 420 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M-20 60 C 80 40, 140 70, 200 45 C 280 15, 340 65, 440 30"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </svg>
      </div>
    </motion.div>
  );
}
