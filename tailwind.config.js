module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        authpass: "#40b673",
        authfail: "#ffc4c5",
        shardready: "#d2edde",
        titleblue: "#047FD9",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
