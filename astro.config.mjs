import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import compress from "astro-compress"
import { defineConfig } from "astro/config"
import { VitePWA } from "vite-plugin-pwa"
import { manifest } from "./src/utils/manifest"
import { config } from "/src/settings"

// https://astro.build/config
export default defineConfig({
  site: `${config.site.base.url}`,
	prefetch: {
		prefetchAll: true,
		defaultStrategy: "viewport",
	},
	integrations: [
		sitemap({
			filter: page => page !== `${config.site.base.url}/admin-page`,
		}),
		tailwind({
			applyBaseStyles: false,
		}),
		compress(),
	],
	vite: {
		plugins: [
			VitePWA({
				registerType: "autoUpdate",
				manifest,
				workbox: {
					globDirectory: "dist",
					globPatterns: [
						"**/*.{js,css,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico}",
					],
					navigateFallback: null,
				},
			}),
		],
	},
})
