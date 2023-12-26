/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./container/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': { max: "360px" },
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1150px',
      '2xl': '1536px',
      '3xl':'2560px'
    },
    extend: {
      opacity: {
        '10': '0.1',
        '20': '0.2',
        '95': '0.95',
       },
      borderOpacity: {
        '10': '0.1',
        '20': '0.2',
        '95': '0.95',
       },
      backgroundImage: {
        'mask': "url('./public/maskgroup.png')",
        "pomodoroBg":"url('.public/images/bg.png')",
        imagebg: "url('../public/images/bgImage.png')",
        bgcompressblue: "url('../public/icons/BgPdf.svg')",
        bgconvertpurple: "url('../public/icons/BgText.svg')"
        
      }
    },
  },
  plugins: [],
};
