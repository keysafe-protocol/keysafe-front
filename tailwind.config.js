module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        basecolor: {
          DEFAULT: "#41B06E",
          100: "rgba(65,176,110,0.1)",
          200: "rgba(65,176,110,0.2)",
          300: "rgba(65,176,110,0.3)",
        },
        baseblue: {
          DEFAULT: "#047FD9",
          100: "rgba(4,127,217,0.1)",
          200: "rgba(4,127,217,0.2)",
          300: "rgba(4,127,217,0.3)",
        },
        authpass: "#59bb80",
        authfail: "#eff9f3",
        shardready: "#bce1cc",
        titlecolor: "#41B06E",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
