import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#01327E',
        secondary: '#CE8769',
        grayBg: '#F9FAFB',
        textBody: '#454F5E',
        textAccent: '#AEBDD2',
        textDark: '#050E1C',
        textSubtle: '#7B8798',
        failure: '#E74C3C',
        failureLight: '#FAD4D0',
        success: '#219B17',
        successLight: '#90EE90',
        warning: '#D97706',
        warningLight: '#FDE68A',
        info: '#2563EB',
        infoLight: '#BFDBFE',
        danger: '#FF0000',
        dangerLight: '#FCA5A5',
        error: '#FF0000',
        errorLight: '#FCA5A5',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [forms, typography],
};
