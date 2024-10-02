# Astro.js 4.15

- vitePWA 

Есть **_netlify.toml** и **_vercel.json** для деплоя с PWA **(убрать перед _)**

- React + Framer-motion для **Nav.jsx**
- Tainwind классы для темной темы 
- ThemeSwitcher.jsx (удалить, работает плохо бери у tatars.kz проекта)
- Хлебные крошки (Breadcrumbs.astro - не работают: **теги** и **категории**)

## Самое главное - фильрация по: тегам, категориям

- всего 3 .ts файла

**getAllPosts.ts**

```ts
import { getCollection } from "astro:content"
import { slugify } from './libs/utils'
// Вывод постов по новым датам и по статусу draft
export const getAllPosts = async content => {
	const posts = (await getCollection(content))
		.filter(({ data }) => (import.meta.env.PROD ? data.draft !== true : true))
		// "2024-02-21T15:30:00Z"
		//	datePublished: z.union([z.string().datetime(), z.date()]),
		.sort((a, b) => +new Date(b.data.datePublished) - +new Date(a.data.datePublished))
	return posts
}
```

**getTaxonomy.ts**

```ts
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
```

**taxonomyFilter.ts**

```ts
import { slugify } from './libs/utils'
const taxonomyFilter = (posts: any[], name: string, key: any) =>
	posts.filter(post =>
		post.data[name].map((name: string) => slugify(name)).includes(key),
	)
export default taxonomyFilter
```

## slugify и slugifyReverse (с рус. на англ. и наоборот, но без учета "ь")


```ts
export function slugify(input) {
	if (!input) return ""

	// Словарь для замены русских букв на латиницу
	const ruToEn = {
		а: "a",
		б: "b",
		в: "v",
		г: "g",
		д: "d",
		е: "e",
		ё: "yo",
		ж: "zh",
		з: "z",
		и: "i",
		й: "y",
		к: "k",
		л: "l",
		м: "m",
		н: "n",
		о: "o",
		п: "p",
		р: "r",
		с: "s",
		т: "t",
		у: "u",
		ф: "f",
		х: "kh",
		ц: "ts",
		ч: "ch",
		ш: "sh",
		щ: "shch",
		ы: "y",
		э: "e",
		ю: "yu",
		я: "ya",
		ъ: "",
		ь: "",
	}

	// Заменяем русские буквы на латиницу
	let slug = input
		.toLowerCase()
		.trim()
		.replace(/[а-яё]/gi, match => ruToEn[match] || "")

	// Удаляем акценты и специальные символы
	slug = slug.normalize("NFD").replace(/\p{M}/gu, "")

	// Заменяем недопустимые символы пробелами
	slug = slug.replace(/[^a-z0-9\s-]/g, " ").trim()

	// Заменяем несколько пробелов или дефисов на один дефис
	slug = slug.replace(/[\s-]+/g, "-")

	return slug
}

export function slugifyReverse(input) {
	if (!input) return ""

	// Словарь для замены латинских букв на русские
	const enToRu = {
		a: "а",
		b: "б",
		v: "в",
		g: "г",
		d: "д",
		e: "е",
		yo: "ё",
		zh: "ж",
		z: "з",
		i: "и",
		y: "й",
		k: "к",
		l: "л",
		m: "м",
		n: "н",
		o: "о",
		p: "п",
		r: "р",
		s: "с",
		t: "т",
		u: "у",
		f: "ф",
		kh: "х",
		ts: "ц",
		ch: "ч",
		sh: "ш",
		shch: "щ",
		y: "ы",
		e: "э",
		yu: "ю",
		ya: "я",
		"": "", // для символа, который мы не можем преобразовать
	}

	// Разбиваем входную строку на отдельные слова, используя дефис как разделитель
	const words = input.split("-")

	// Для каждого слова преобразуем его обратно в кириллицу
	const translatedWords = words.map(word => {
		let translated = ""

		// Ищем соответствующие русские буквы в словаре
		let i = 0
		while (i < word.length) {
			if (i + 1 < word.length && enToRu[word.slice(i, i + 2)]) {
				translated += enToRu[word.slice(i, i + 2)]
				i += 2 // Пропускаем два символа
			} else if (enToRu[word[i]]) {
				translated += enToRu[word[i]]
				i += 1 // Пропускаем один символ
			} else {
				// Если символ не имеет соответствия, добавляем его как есть
				translated += word[i]
				i += 1 // Пропускаем один символ
			}
		}

		return translated
	})

	// Соединяем слова обратно с пробелами
	return translatedWords.join(" ")
}

```