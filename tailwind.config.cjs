/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    fontFamily: {
        "mono": ["JetBrains Mono", "monospace"]
    },
    extend: {},
  },

  plugins: [],
};

module.exports = config;
