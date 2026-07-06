import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        console: {
          bg: "#07111f",
          panel: "#0c1729",
          panel2: "#102036",
          line: "rgba(148, 163, 184, 0.18)",
          text: "#e2e8f0",
          muted: "#94a3b8",
          accent: "#4fd1c5",
          accent2: "#60a5fa",
          danger: "#f87171"
        }
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(96, 165, 250, 0.22), 0 24px 70px rgba(2, 8, 23, 0.55)"
      },
      backgroundImage: {
        "radar-grid":
          "radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.12) 1px, transparent 0)"
      }
    }
  },
  plugins: []
};

export default config;