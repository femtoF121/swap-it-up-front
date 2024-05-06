/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      white50: "#FFFFF9",
      white100: "#F7F7EE",
      white200: "#A0A0A0",
      white400: "#616161",
      teal50: "#CDF2F1",
      teal100: "#97E0DE",
      teal200: "#40ABA9",
      teal400: "#17706E",
      teal600: "#053534",
      orange50: "#FFE8D6",
      orange100: "#FFD6B7",
      orange200: "#FCAC6E",
      orange400: "#FB7813",
      orange600: "#C65600",
      green50: "#F5FFEA",
      green100: "#EBFFD4",
      green200: "#D8FFAD",
      green400: "#B6EB7A",
      green600: "#70AF29",
    },
    fontFamily: {
      nunito: "Nunito, sans-serif",
      jost: "Jost, sans-serif",
    },
    extend: {
      screens: {
        mobile: { max: "599px" },
        tablet: { max: "1279px" },
        desktop: { min: "1280px" },
        "below-998": { max: "998px" },
        "below-1200": { max: "1199px" },
        "below-420": { max: "420px" },
        "above-1200": { min: "1200px" },
        "below-768": { max: "768px" },
      },
    },
  },
  plugins: [],
};
