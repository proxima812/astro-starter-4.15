import { config } from '@/settings'
import rss from "@astrojs/rss"
import { getCollection } from "astro:content"

export async function GET(context) {
	const blog = await getCollection("blog")
	return rss({
		title: config.site.OG.title,
		description: config.site.OG.description,
		site: context.site,
		items: blog.map(post => ({
			title: post.data.title,
			pubDate: post.data.datePublished,
			description: post.data.description,
			link: `/blog/${post.slug}/`,
		})),
	})
}
