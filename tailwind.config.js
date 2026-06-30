/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        luxury: {
          black: "#0D0D0D",
          charcoal: "#1A1A1A",
        },
        gold: {
          DEFAULT: "#D4AF37",
          dark: "#B8860B",
          light: "#E8CC6E",
        },
        silver: "#C0C0C0",
        ink: {
          DEFAULT: "#0D0D0D",
        },
        surface: {
          bg: "#FAFAFA",
          card: "#FFFFFF",
          border: "#ECECEC",
        },
        success: "#16A34A",
        error: "#DC2626",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        luxury: "16px",
        btn: "14px",
      },
      boxShadow: {
        luxury: "0 20px 60px -15px rgba(13,13,13,0.25)",
        "luxury-sm": "0 8px 24px -8px rgba(13,13,13,0.18)",
        "luxury-lg": "0 30px 80px -20px rgba(13,13,13,0.35)",
        gold: "0 8px 30px -6px rgba(212,175,55,0.45)",
        "inner-gold": "inset 0 0 0 1px rgba(212,175,55,0.4)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #D4AF37 0%, #F4E4A6 50%, #B8860B 100%)",
        "gold-gradient-soft": "linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)",
        "black-sheen": "linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 60%, #0D0D0D 100%)",
        "glass-light": "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.3))",
      },
      letterSpacing: {
        luxe: "0.18em",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(212,175,55,0.5)" },
          "50%": { boxShadow: "0 0 0 8px rgba(212,175,55,0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-out forwards",
        slideUp: "slideUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards",
        slideInRight: "slideInRight 0.5s ease-out forwards",
        shimmer: "shimmer 2s infinite linear",
        pulseGold: "pulseGold 2s infinite",
        marquee: "marquee 30s linear infinite",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
