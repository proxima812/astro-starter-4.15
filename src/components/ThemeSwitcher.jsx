import { useEffect, useState } from "react"

const ThemeSwitcher = () => {
	const [isDarkMode, setIsDarkMode] = useState(false)

	// Проверяем сохраненную тему в localStorage при загрузке
	useEffect(() => {
		const savedTheme = localStorage.getItem("theme")
		if (savedTheme === "dark") {
			setIsDarkMode(true)
			document.body.classList.add("dark")
		} else {
			document.body.classList.remove("dark")
		}
	}, [])

	const toggleTheme = () => {
		setIsDarkMode(prevMode => {
			const newMode = !prevMode
			// Сохраняем выбор в localStorage
			localStorage.setItem("theme", newMode ? "dark" : "light")
			// Переключаем класс
			if (newMode) {
				document.body.classList.add("dark")
			} else {
				document.body.classList.remove("dark")
			}
			return newMode
		})
	}

	return <button onClick={toggleTheme}>{isDarkMode ? "светлая" : "темная"}</button>
}

export default ThemeSwitcher
