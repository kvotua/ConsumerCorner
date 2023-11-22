/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
        container: {
            padding: "25px",
            center: true,
        },
        colors: {
            black: "#313231",
            white: "#FAFBFF",
            red: "#EA271B",
        },
        fontSize: {
            "30px": "30px",
            "15px": "15px",
            "18px": "18px",
        },
        borderRadius: {
            activeBorder: "10px 10px 0px 10px",
            passiveBorder: "0px 10px 10px 10px",
        },
    },
    plugins: [],
};
