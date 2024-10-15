/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	darkMode: "class",
	theme: {
		extend: {
			fontFamily: {
				sans: [
					"-apple-system",
					"BlinkMacSystemFont",
					'"SF Pro Text"',
					'"SF Pro Display"',
					"Roboto",
					"Arial",
					"sans-serif",
				],
			},
			colors: {
				dark: "#000",
				light: "#fff",
				tdark: "#fff",
				tlight: "#000",
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
}
