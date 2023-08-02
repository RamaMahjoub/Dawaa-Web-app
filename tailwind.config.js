/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Markazi: "Markazi Text",
      },
      colors: {
        primary: {
          dark: "#1D4ED8",
          main: "#2563EB",
          light: "#EFF6FF",
        },
        secondary: {
          main: "#FBBF24",
          light: "#FFF0E6",
          dark: "#FE964A",
        },
        green: {
          light: "#E7F7EF",
          main: "#0CAF60",
        },
        red: {
          main: "#FD6A6A",
          light: "#FFF0F0",
        },
        greyScale: {
          lighter: "#F8FAFC",
          light: "#94A3B8",
          main: "#64748B",
          dark: "#0F172A",
        },
      },
      borderRadius: {
        small: "8px",     
        med: "12px", 
        larg: "24px",
      },
      fontSize: {
        "x-small": "10px",
        small: "12px",
        medium: "14px",
        large: "16px",
        'x-large': "18px",
        'xx-large': "20px"
      },
      spacing: {
        "xx-small": "2px",
        "x-small": "4px",
        small: "8px", 
        medium: "12px",
        large: "16px",
        "x-large": "20px",
        "xx-large": "40px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
