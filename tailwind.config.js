/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  corePlugins: {
    preflight: false, // Disable Tailwind preflight to avoid messing up existing page styles
  },
  content: [
    "./src/components/team/**/*.{js,ts,jsx,tsx}",
    "./src/pages/Team.jsx",
    "./src/pages/Alumni.jsx",
  ],
  theme: {
    extend: {
      colors: {
        graphite: {
          950: "#06080B",
          900: "#0A0D12",
          850: "#0E1218",
          800: "#131820",
          700: "#1B222C",
          600: "#2A3340",
        },
        copper: {
          400: "#F2A766",
          500: "#E08A3C",
          600: "#C06A22",
        },
        signal: {
          400: "#6FE3C4",
          500: "#3FCBA8",
        },
        paper: "#E9E6DE",
        muted: "#8A93A3",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        xl2: "22px",
      },
      backgroundImage: {
        "grid-blueprint":
          "linear-gradient(rgba(111,227,196,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(111,227,196,0.05) 1px, transparent 1px)",
        "mesh-1":
          "radial-gradient(at 20% 20%, rgba(224,138,60,0.18) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(111,227,196,0.12) 0px, transparent 50%), radial-gradient(at 50% 90%, rgba(224,138,60,0.10) 0px, transparent 50%)",
      },
      backgroundSize: {
        grid: "44px 44px",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(224,138,60,0.25), 0 8px 40px -8px rgba(224,138,60,0.35)",
        "glow-signal":
          "0 0 0 1px rgba(111,227,196,0.25), 0 8px 40px -8px rgba(111,227,196,0.35)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        pulseLine: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.9" },
        },
        drift: {
          "0%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(2%, -3%)" },
          "100%": { transform: "translate(0,0)" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        "pulse-line": "pulseLine 3s ease-in-out infinite",
        drift: "drift 18s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
