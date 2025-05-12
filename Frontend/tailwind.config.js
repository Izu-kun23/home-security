// tailwind.config.js
export default {
    content: [
      "./index.html", // or adjust to match your file structure
      "./src/**/*.{js,ts,jsx,tsx}", // Make sure it matches your React files
    ],
    theme: {
      extend: {
        fontFamily: {
          'uber-move': ['Uber Move', 'sans-serif'], // Adding Uber Move font
        },
      },
    },
    plugins: [],
  }