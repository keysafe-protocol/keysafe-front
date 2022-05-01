module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        basecolor: "#41B06E",
        authpass: "#40b673",
        authfail: "#ffc4c5",
        shardready: "#d2edde",
        titleblue: "#047FD9",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
