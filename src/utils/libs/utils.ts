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
