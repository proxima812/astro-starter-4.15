import { getAllPosts } from "./getPosts"
// Функция для получения всех таксономий
const getTaxonomy = async (collection, name) => {
	const singlePages = await getAllPosts(collection)
	let taxonomies = []

	// Сбор всех таксономий из постов
	singlePages.forEach(page => {
		const categoryArray = page.data[name] // Получаем массив категорий из каждого поста
		if (Array.isArray(categoryArray)) {
			// Проверяем, является ли это массивом
			categoryArray.forEach(category => {
				// Добавляем слаг в массив
				taxonomies.push((category)) // Используем slugify для нормализации
			})
		}
	})

	// Удаляем дубликаты с помощью Set
	const uniqueTaxonomies = [...new Set(taxonomies)]
	return uniqueTaxonomies
}

export default getTaxonomy
