/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ["./src/**/*.{html,js}"],
	theme: {
		colors: {
			'white': '#ffffff',
			'black': '#000000',
			'primary': '#FFD15B',
			'gray': '#EDEDED'
		},
		fontFamily: {
			manrope: ['Manrope', 'sans-serif'],
			anton: ['Anton', 'sans-serif'],
      		serif: ['serif'],
		},
		backgroundPosition: {
			'bottom-hero-bg': '50% 80%'
		},
		extend: {
			backgroundImage: {
				heroBackground: "url('/src/assets/images/main-background.jpeg')"
			}
		},
	},
	plugins: [],
};
