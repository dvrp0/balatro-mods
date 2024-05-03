/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    fontFamily: {
        "mono": ["JetBrains Mono", "monospace"]
    },
    extend: {
        "colors": {
            "cine": {
                "300": "#a7b38f",
                "500": "#92ab5c",
            }
        }
    },
  },

  plugins: [],
};

module.exports = config;
