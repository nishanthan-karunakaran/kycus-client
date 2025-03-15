/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#01327E",
        secondary: "#CE8769",
        textBody: "#454F5E",
        textAccent: "#AEBDD2",
        textDark: "#050E1C",
        textSubtle: "#7B8798",
        failure: "#E74C3C",
        failureLight: "#FAD4D0",
        success: "#15803D",
        successLight: "#90EE90",
        warning: "#D97706",
        warningLight: "#FDE68A",
        info: "#2563EB",
        infoLight: "#BFDBFE",
        danger: "#FF0000",
        dangerLight: "#FCA5A5",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
