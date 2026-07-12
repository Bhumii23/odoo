import React from 'react';
import { motion } from 'framer-motion';

export default function SocialLoginButtons({ onClickProvider }) {
  const providers = [
    {
      id: 'google',
      name: 'Google',
      icon: (
        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none">
          <path
            fill="#EA4335"
            d="M5.266 9.765A7.077 7.077 0 0112 4.909c1.69 0 3.218.6 4.418 1.582l3.51-3.51C17.764 1.055 15.027 0 12 0 7.339 0 3.327 2.682 1.386 6.586l3.88 3.179z"
          />
          <path
            fill="#4285F4"
            d="M23.64 12.273c0-.818-.073-1.609-.209-2.373H12v4.582h6.545c-.282 1.482-1.118 2.736-2.373 3.582l3.7 2.873c2.164-2 3.768-4.936 3.768-8.664z"
          />
          <path
            fill="#FBBC05"
            d="M5.266 14.235l-3.88 3.179C3.327 21.318 7.339 24 12 24c3.082 0 5.673-1.018 7.564-2.773l-3.7-2.873a7.12 7.12 0 01-3.864 1.09c-3.709 0-6.845-2.509-7.964-5.99l-3.88 3.18.01.001z"
          />
          <path
            fill="#34A853"
            d="M1.386 6.586A11.948 11.948 0 000 12c0 1.945.464 3.782 1.282 5.414l3.974-3.179c-.282-.691-.446-1.445-.446-2.235 0-.791.164-1.545.446-2.236L1.386 6.586z"
          />
        </svg>
      ),
    },
    {
      id: 'microsoft',
      name: 'Microsoft',
      icon: (
        <svg className="w-4 h-4 mr-2" viewBox="0 0 23 23" fill="none">
          <path fill="#F25022" d="M0 0h11v11H0z" />
          <path fill="#7FBA00" d="M12 0h11v11H12z" />
          <path fill="#01A6F0" d="M0 12h11v11H0z" />
          <path fill="#FFB900" d="M12 12h11v11H12z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {providers.map((provider) => (
        <motion.button
          key={provider.id}
          whileHover={{ scale: 1.02, backgroundColor: '#fcfbfe' }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => onClickProvider(provider.id)}
          className="flex items-center justify-center py-2.5 px-4 rounded-xl border border-brand-border bg-white text-xs font-semibold text-brand-text hover:border-brand-accent transition-all duration-200 shadow-[0_2px_4px_rgba(46,35,49,0.01)] cursor-pointer"
        >
          {provider.icon}
          <span>{provider.name}</span>
        </motion.button>
      ))}
    </div>
  );
}
