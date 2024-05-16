# astro starter 4.5 minimal

_стартер буду дорабатывать по мере понимая, чего нужно или чего убрать._

## Пакеты

- astro 4.5
- tailwind (+ @tailwindcss/typography')
- sitemap
- rss
- astro-compress
- PWA

## Необходимые настройки

- в settings.ts

## Если не хочешь manifest в проекте

**Это в /layouts/MainLayout.astro**

```astro
<SEOHead
  noManifest
/>
```

**Также в astro.config.mjs - убираешь vite**

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

## Структура проекта

```md
├── astro.config.mjs
├── package-lock.json
├── package.json
├── public
│ ├── favicon.svg
│ └── favicons
│ └── icons
├── src
│ ├── assets
│ ├── components
│ │ ├── Favicons.astro
│ │ ├── SEOHead.astro
│ │ └── partials
│ │ ├── Footer.astro
│ │ └── Header.astro
│ ├── content
│ │ ├── config.ts
│ │ └── items
│ │ └── item.md
│ ├── data
│ ├── env.d.ts
│ ├── layouts
│ │ └── MainLayout.astro
│ ├── pages
│ │ ├── index.astro
│ │ ├── robots.txt.ts
│ │ └── rss.xml.js
│ ├── settings.ts
│ ├── styles
│ │ └── tailwind.css
│ └── utils
│ ├── libs
│ └── manifest.ts
├── tailwind.config.mjs
└── tsconfig.json
```
# astro-starter-4.5
