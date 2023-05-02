import React, { useEffect, useState } from "react"
import "./index.css"
import { useAppContext } from "../../store"

const fetchWeatherData = async (cityName) => {
	const response = await fetch(
		`http://api.weatherapi.com/v1/forecast.json?key=304090ed092c4b3cbf0141340230105&q=${cityName}&days=5&aqi=no&alerts=no`
	)
	return await response.json()
}

const CityCard = ({ cityName }) => {
	const { theme, selectedCity, setSelectedCity, removeCity } = useAppContext()
	const [city, setCity] = useState(null)

	useEffect(() => {
		fetchWeatherData(cityName).then(setCity)
	}, [cityName])

	if (city && city.error) return null

	return (
		<div
			onClick={() => {
				setSelectedCity(selectedCity === cityName ? "" : cityName)
			}}
			className={`card card_${theme} ${
				selectedCity === cityName ? "card_selected" : ""
			}`}
		>
			{!city && <div>Loading data</div>}
			{city && (
				<>
					<button
						className="close_icon"
						onClick={(e) => {
							e.stopPropagation()
							removeCity(cityName)
						}}
					>
						X
					</button>
					<div className="city_label">{city.location.name}</div>
					<div className="country_label">{city.location.country}</div>
					<img
						src={city.current.condition.icon}
						style={{ width: 100, height: 100 }}
						alt="weather_logo"
					/>
					<div className="temperature_label">{city.current.temp_c}°C</div>
					<div className="condition_text_label">
						{city.current.condition.text}
					</div>{" "}
				</>
			)}
		</div>
	)
}

const Cities = () => {
	const { theme, cities } = useAppContext()

	return (
		<div className={`container container_${theme}`}>
			<h2 className={`title_${theme}`}>Weather dashboard</h2>
			<div className="cards_container">
				{cities.map((cityName) => (
					<CityCard cityName={cityName} />
				))}
			</div>
		</div>
	)
}

export default Cities
