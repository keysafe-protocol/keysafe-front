module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        basecolor: "#41B06E",
        authpass: "#59bb80",
        authfail: "#eff9f3",
        shardready: "#bce1cc",
        titlecolor: "#41B06E",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
