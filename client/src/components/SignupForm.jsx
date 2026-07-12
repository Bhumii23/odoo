import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Building, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function SignupForm({ onSwitchTab, onSubmitSuccess }) {
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation states
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name';
    }

    if (!organization.trim()) {
      newErrors.organization = 'Organization name is required';
    }

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

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the Terms of Service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    // Mock API signup
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Delay before redirecting to dashboard
      setTimeout(() => {
        onSubmitSuccess();
      }, 1000);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
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
            <span>Account created! Welcome to TransitOps...</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Name Input */}
      <div>
        <label className="block text-[11px] font-semibold text-brand-text uppercase tracking-wider mb-1 pl-1">
          Full Name
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-muted">
            <User className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={fullName}
            disabled={isSubmitting || isSuccess}
            onChange={(e) => setFullName(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 bg-[#FBFBFC] border text-xs text-brand-text rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/10 transition-all duration-200 ${
              errors.fullName ? 'border-rose-400 focus:border-rose-500' : 'border-brand-border focus:border-brand-primary'
            }`}
            placeholder="John Doe"
          />
        </div>
        {errors.fullName && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-1 mt-1 text-rose-500 text-[10px] font-medium pl-1"
          >
            <AlertCircle className="w-3 h-3 flex-shrink-0" />
            <span>{errors.fullName}</span>
          </motion.div>
        )}
      </div>

      {/* Organization Input */}
      <div>
        <label className="block text-[11px] font-semibold text-brand-text uppercase tracking-wider mb-1 pl-1">
          Organization
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-muted">
            <Building className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={organization}
            disabled={isSubmitting || isSuccess}
            onChange={(e) => setOrganization(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 bg-[#FBFBFC] border text-xs text-brand-text rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/10 transition-all duration-200 ${
              errors.organization ? 'border-rose-400 focus:border-rose-500' : 'border-brand-border focus:border-brand-primary'
            }`}
            placeholder="Transit Authority Corp"
          />
        </div>
        {errors.organization && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-1 mt-1 text-rose-500 text-[10px] font-medium pl-1"
          >
            <AlertCircle className="w-3 h-3 flex-shrink-0" />
            <span>{errors.organization}</span>
          </motion.div>
        )}
      </div>

      {/* Email Input */}
      <div>
        <label className="block text-[11px] font-semibold text-brand-text uppercase tracking-wider mb-1 pl-1">
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
            className={`w-full pl-10 pr-4 py-2.5 bg-[#FBFBFC] border text-xs text-brand-text rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/10 transition-all duration-200 ${
              errors.email ? 'border-rose-400 focus:border-rose-500' : 'border-brand-border focus:border-brand-primary'
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
        <label className="block text-[11px] font-semibold text-brand-text uppercase tracking-wider mb-1 pl-1">
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
            className={`w-full pl-10 pr-10 py-2.5 bg-[#FBFBFC] border text-xs text-brand-text rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/10 transition-all duration-200 ${
              errors.password ? 'border-rose-400 focus:border-rose-500' : 'border-brand-border focus:border-brand-primary'
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

      {/* Confirm Password Input */}
      <div>
        <label className="block text-[11px] font-semibold text-brand-text uppercase tracking-wider mb-1 pl-1">
          Confirm Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-muted">
            <Lock className="w-4 h-4" />
          </div>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            disabled={isSubmitting || isSuccess}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full pl-10 pr-10 py-2.5 bg-[#FBFBFC] border text-xs text-brand-text rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/10 transition-all duration-200 ${
              errors.confirmPassword ? 'border-rose-400 focus:border-rose-500' : 'border-brand-border focus:border-brand-primary'
            }`}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            disabled={isSubmitting || isSuccess}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-brand-muted hover:text-brand-text transition-colors duration-150 cursor-pointer"
          >
            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-1 mt-1 text-rose-500 text-[10px] font-medium pl-1"
          >
            <AlertCircle className="w-3 h-3 flex-shrink-0" />
            <span>{errors.confirmPassword}</span>
          </motion.div>
        )}
      </div>

      {/* Terms and conditions */}
      <div className="pt-1">
        <label className="flex items-start space-x-2 text-[11px] font-medium text-brand-muted cursor-pointer select-none">
          <input
            type="checkbox"
            checked={agreeTerms}
            disabled={isSubmitting || isSuccess}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="rounded border-brand-border text-brand-primary focus:ring-brand-primary/20 w-3.5 h-3.5 mt-0.5"
          />
          <span className="leading-tight">
            I agree to the{' '}
            <button type="button" onClick={() => alert('Terms of Service dialog')} className="text-brand-primary font-bold hover:underline cursor-pointer">
              Terms of Service
            </button>{' '}
            and{' '}
            <button type="button" onClick={() => alert('Privacy Policy dialog')} className="text-brand-primary font-bold hover:underline cursor-pointer">
              Privacy Policy
            </button>.
          </span>
        </label>
        {errors.agreeTerms && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-1 mt-1 text-rose-500 text-[10px] font-medium pl-1"
          >
            <AlertCircle className="w-3 h-3 flex-shrink-0" />
            <span>{errors.agreeTerms}</span>
          </motion.div>
        )}
      </div>

      {/* Create Account Button */}
      <motion.button
        whileHover={!(isSubmitting || isSuccess) ? { scale: 1.01 } : {}}
        whileTap={!(isSubmitting || isSuccess) ? { scale: 0.99 } : {}}
        type="submit"
        disabled={isSubmitting || isSuccess}
        className="w-full py-3.5 px-4 bg-brand-primary hover:bg-brand-primary-hover text-white font-semibold text-xs rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center space-x-2 mt-4 cursor-pointer disabled:opacity-85 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <span>Create Account</span>
        )}
      </motion.button>

      {/* Toggle Link */}
      <div className="text-center pt-3 text-xs">
        <span className="text-brand-muted">Already have an account? </span>
        <button
          type="button"
          onClick={onSwitchTab}
          disabled={isSubmitting || isSuccess}
          className="text-brand-primary hover:text-brand-primary-hover font-bold transition-colors duration-150 cursor-pointer"
        >
          Login
        </button>
      </div>
    </form>
  );
}
