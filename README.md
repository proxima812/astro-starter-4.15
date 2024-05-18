# astro starter 4.8 minimal

_стартер буду дорабатывать по мере понимая, чего нужно или чего убрать._

## Пакеты

- astro 4.5
- tailwind (+ @tailwindcss/typography')
- sitemap
- rss
- astro-compress
- PWA

## Если НЕ нужен darkMode удали в двух местах.

**@/layouts/MainLayout.astro**

```html
<!-- DARKMODE ON -->
<script is:inline>
	const getThemePreference = () => {
		if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
			return localStorage.getItem("theme")
		}
		return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
	}
	const isDark = getThemePreference() === "dark"
	document.documentElement.classList[isDark ? "add" : "remove"]("dark")

	if (typeof localStorage !== "undefined") {
		const observer = new MutationObserver(() => {
			const isDark = document.documentElement.classList.contains("dark")
			localStorage.setItem("theme", isDark ? "dark" : "light")
		})
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		})
	}
</script>
```

**/tailwind.config.mjs**

- darkMode: "class",

```mjs
/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	darkMode: "class",
	theme: {
		extend: {},
	},
	plugins: [require("@tailwindcss/typography")],
}

```

## Необходимые настройки

- в settings.ts


## Если НЕ нужен PWA удали перед npm i и в package.json

**В astro.config.mjs - убираешь vite**

```mjs
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
```

## Для создания иконок для PWA из 1024x1024 используй сервис

- [favycon.vercel.app](https://favycon.vercel.app/)

## Content Collection

Если **draft: true**, то НЕ будет в конечном итоге в сборке.

```ts
const items = defineCollection({
	schema: ({ image }) => {
		z.object({
			title: z.string().default("title"),
			description: z.string().default("description"),
			ogImage: image().optional(),
			// "2024-02-21T15:30:00Z"
			datePublished: z.union([z.string().datetime(), z.date()]),
			draft: z.boolean().default(false),
		})
	},
})
```