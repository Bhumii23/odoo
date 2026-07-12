import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import SocialLoginButtons from './SocialLoginButtons';

export default function LoginForm({ onSwitchTab, onSubmitSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Validation states
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    // Mock api call delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Delay before redirecting to dashboard
      setTimeout(() => {
        onSubmitSuccess();
      }, 1000);
    }, 1500);
  };

  const handleSocialClick = (provider) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onSubmitSuccess();
      }, 1000);
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      {/* Success Banner */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center space-x-2 text-emerald-800 text-xs font-semibold"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Success! Redirecting to dashboard...</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Email Input */}
      <div>
        <label className="block text-[11px] font-semibold text-brand-text uppercase tracking-wider mb-1.5 pl-1">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-muted">
            <Mail className="w-4 h-4" />
          </div>
          <input
            type="email"
            value={email}
            disabled={isSubmitting || isSuccess}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 bg-[#FBFBFC] border text-xs text-brand-text rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/10 transition-all duration-200 ${
              errors.email 
                ? 'border-rose-400 focus:border-rose-500' 
                : 'border-brand-border focus:border-brand-primary'
            }`}
            placeholder="name@organization.com"
          />
        </div>
        {errors.email && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-1 mt-1 text-rose-500 text-[10px] font-medium pl-1"
          >
            <AlertCircle className="w-3 h-3 flex-shrink-0" />
            <span>{errors.email}</span>
          </motion.div>
        )}
      </div>

      {/* Password Input */}
      <div>
        <label className="block text-[11px] font-semibold text-brand-text uppercase tracking-wider mb-1.5 pl-1">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-muted">
            <Lock className="w-4 h-4" />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            disabled={isSubmitting || isSuccess}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full pl-10 pr-10 py-3 bg-[#FBFBFC] border text-xs text-brand-text rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/10 transition-all duration-200 ${
              errors.password 
                ? 'border-rose-400 focus:border-rose-500' 
                : 'border-brand-border focus:border-brand-primary'
            }`}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isSubmitting || isSuccess}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-brand-muted hover:text-brand-text transition-colors duration-150 cursor-pointer"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-1 mt-1 text-rose-500 text-[10px] font-medium pl-1"
          >
            <AlertCircle className="w-3 h-3 flex-shrink-0" />
            <span>{errors.password}</span>
          </motion.div>
        )}
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between text-[11px] font-medium pt-1">
        <label className="flex items-center space-x-2 text-brand-muted cursor-pointer select-none">
          <input
            type="checkbox"
            checked={rememberMe}
            disabled={isSubmitting || isSuccess}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="rounded border-brand-border text-brand-primary focus:ring-brand-primary/20 w-3.5 h-3.5"
          />
          <span>Remember me</span>
        </label>
        <button
          type="button"
          onClick={() => alert('Password reset link sent to your registered email.')}
          disabled={isSubmitting || isSuccess}
          className="text-brand-primary hover:text-brand-primary-hover font-semibold transition-colors duration-150 cursor-pointer"
        >
          Forgot Password?
        </button>
      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={!(isSubmitting || isSuccess) ? { scale: 1.01 } : {}}
        whileTap={!(isSubmitting || isSuccess) ? { scale: 0.99 } : {}}
        type="submit"
        disabled={isSubmitting || isSuccess}
        className="w-full py-3.5 px-4 bg-brand-primary hover:bg-brand-primary-hover text-white font-semibold text-xs rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center space-x-2 mt-6 cursor-pointer disabled:opacity-85 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <span>Login</span>
        )}
      </motion.button>

      {/* Divider */}
      <div className="relative my-6 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-brand-border/60"></div>
        </div>
        <span className="relative px-3 bg-white text-[10px] font-semibold tracking-wider text-brand-muted uppercase">
          Or continue with
        </span>
      </div>

      {/* Social login buttons */}
      <SocialLoginButtons onClickProvider={handleSocialClick} />

      {/* Toggle Link */}
      <div className="text-center pt-4 text-xs">
        <span className="text-brand-muted">Don't have an account? </span>
        <button
          type="button"
          onClick={onSwitchTab}
          disabled={isSubmitting || isSuccess}
          className="text-brand-primary hover:text-brand-primary-hover font-bold transition-colors duration-150 cursor-pointer"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}
