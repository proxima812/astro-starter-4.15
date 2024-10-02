import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import compress from "astro-compress"

import { defineConfig } from "astro/config"
import { VitePWA } from "vite-plugin-pwa"
import { manifest } from "./src/utils/libs/manifest"
import { config } from "/src/settings"

import react from "@astrojs/react"

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
		react(),
	],
	vite: {
		plugins: [
			VitePWA({
				registerType: "autoUpdate",
				manifest,
				includeAssets: ["favicon.svg"],
				workbox: {
					globDirectory: "dist",
					globPatterns: [
						"**/*.{js,html,css,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico}",
					],
					navigateFallback: "/",
					runtimeCaching: [
						{
							urlPattern: ({ request }) => request.destination === "image",
							handler: "CacheFirst", // Кэшируем изображения
							options: {
								cacheName: "image-cache",
								expiration: {
									maxEntries: 50,
									maxAgeSeconds: 7 * 24 * 60 * 60, // Кэшируем на неделю
								},
							},
						},
					],
				},
				devOptions: {
					enabled: import.meta.env.MODE === 'development' ? true : false,
					navigateFallbackAllowlist: [/^\//],
				},
				experimental: {
					directoryAndTrailingSlashHandler: true,
				},
			}),
		],
	},
})
