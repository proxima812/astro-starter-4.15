import { defineCollection, z } from "astro:content"

const posts = defineCollection({
	schema: ({ image }) => {
		z.object({
			title: z.string().default("title"),
			description: z.string().default("description"),
			ogImage: image().optional(),
			tags: z.array(z.string()).default(["тег"]).optional(),
			categories: z.array(z.string()).default(["категория", "cat"]).optional(),
			// "2024-02-21T15:30:00Z"
			datePublished: z.union([z.string().datetime(), z.date()]),
			draft: z.boolean().default(false),
		})
	},
})

export const collections = { posts }
