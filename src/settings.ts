export const config = {
	site: {
		base: {
			url: "https://site.com",
		},
		OG: {
			site_name: "Компания",
			author: "Человек",
			title: "Страница",
			description: "Описание",
			locale: "ru",
			defaultImage: "default-ogImage.png",
		},
	},
	verifications: {
		yandex: "",
		google: "",
		bing: "",
		// ...
	},
	manifest: {
		short_name: "short-name",
		theme_color: "#fff",
		background_color: "#fff",
		// fullscreen / standalone / minimal-ui / browser
		display: "minimal-ui",
	},
}
