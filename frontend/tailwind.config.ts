/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#3A6CE9",
        originWhite: "#FAFBFF",
        originBlack: "#343B4E",
      },
      boxShadow: {
        myShadow: "0px 3px 4px 0px rgba(22, 68, 181, 0.72)",
      },
    },
    fontFamily: {
      sans: ["Montserrat"],
    },
    container: {
      center: true,
      padding: "10px",
    },
    borderRadius: {
      ButtonEntrepreneur: "20px 20px 0px 20px",
      inputRadius: "0px 10px 10px 10px",
      ButtonActive: "10px 10px 0px 10px",
      ButtonPassive: "10px 10px 10px 0px",
    },
  },
  plugins: [],
};
