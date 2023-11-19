/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "weather-pattern": "url('/assets/bg.jpg')",
      }),
    },
  },
  tailwindConfig: "./tailwind.config.js",
  plugins: ["prettier-plugin-tailwindcss"],
};
