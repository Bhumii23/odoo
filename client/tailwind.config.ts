/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#714B67',
          dark: '#4a3048',
        },
        background: {
          light: '#f8f9fa',
          dark: '#121212',
        },
        // Using standard tailwind colors for status
        success: '#22c55e', // green-500
        info: '#3b82f6',    // blue-500
        warning: '#f97316', // orange-500
        danger: '#ef4444',  // red-500
      },
    },
  },
  plugins: [],
}
