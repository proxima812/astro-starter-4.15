import { config } from "../settings"

export const manifest = {
	name: config.site.OG.site_name,
	short_name: config.manifest.short_name,
	description: config.site.OG.description,
	theme_color: config.manifest.theme_color,
	background_color: config.manifest.background_color,
	display: config.manifest.display,
	icons: [
		{
			src: "/favicons/icons/favicon-192x192.png",
			sizes: "192x192",
			type: "image/png",
		},
		{
			src: "/favicons/icons/favicon-512x512.png",
			sizes: "512x512",
			type: "image/png",
		},
		{
			src: "/favicons/icons/favicon-512x512.png",
			sizes: "512x512",
			type: "image/png",
			purpose: "any maskable",
		},
	],
}
