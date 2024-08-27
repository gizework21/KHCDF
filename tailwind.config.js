/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        nav: "var(--nav)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        background: "var(--background)",
        lightGreen: "var(--lightGreen)",
        textColor: "var(--textColor)",
      },
    },
  },
  plugins: [],
};
