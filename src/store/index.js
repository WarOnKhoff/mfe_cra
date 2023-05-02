import { createContext, useContext, useState } from "react"

export const AppContext = createContext({})

export const AppContextProvider = ({ children }) => {
	const [theme, setTheme] = useState("light")
	const [cities, setCities] = useState([])
	const [selectedCity, setSelectedCity] = useState(null)

	const toggleTheme = () =>
		setTheme((prev) => (prev === "dark" ? "light" : "dark"))

	const addCity = (city) => {
		setCities((prev) => {
			const prevCities = prev.map((city) => city.toLowerCase())
			const updated = new Set([...prevCities, city.toLowerCase()])
			return [...updated]
		})
	}
	const removeCity = (city) => {
		if (city.toLowerCase() === selectedCity.toLowerCase()) setSelectedCity(null)

		setCities((prev) => {
			return prev.filter((prevCity) => prevCity !== city.toLowerCase())
		})
	}

	const value = {
		theme,
		cities,
		selectedCity,
		toggleTheme,
		addCity,
		removeCity,
		setSelectedCity
	}
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)
