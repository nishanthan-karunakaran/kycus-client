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
        success: "#27AE60",
        warning: "#F39C12",
        info: "#3498DB",
        danger: "#FF0000",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
