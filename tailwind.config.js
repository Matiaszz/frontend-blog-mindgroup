export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
        fontFamily: {
            logo: ['Irish Grover', 'cursive'],
        },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
};
