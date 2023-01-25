/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        128: "32rem",
      },
      backgroundImage: {
        'wiply-theme': "url('https://res.cloudinary.com/shulgirit/image/upload/v1641896455/wiply/Platform%20Default%20Images/background.jpg')",
        'gradient-radial': "radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%),radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%);", 
      },
  
    },
  },
  plugins: [],
};
