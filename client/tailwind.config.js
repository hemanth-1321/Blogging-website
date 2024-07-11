/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textShadow: {
        glow: "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)",
        "glow-md":
          "0 0 15px rgba(255, 255, 255, 0.8), 0 0 25px rgba(255, 255, 255, 0.6)",
      },
    },
  },

  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          ".text-shadow-glow": {
            textShadow:
              "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)",
          },
          ".text-shadow-glow-md": {
            textShadow:
              "0 0 15px rgba(255, 255, 255, 0.8), 0 0 25px rgba(255, 255, 255, 0.6)",
          },
        },
        ["responsive", "hover"]
      );
    },
  ],
};
