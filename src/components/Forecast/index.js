import React, { useEffect, useState } from "react"
import "./index.css"
import { useAppContext } from "../../store"

const fetchWeatherData = async (cityName) => {
	const response = await fetch(
		`http://api.weatherapi.com/v1/forecast.json?key=304090ed092c4b3cbf0141340230105&q=${cityName}&days=5&aqi=no&alerts=no`
	)
	return await response.json()
}

const ForecastDay = ({ forecast }) => {
	const { theme } = useAppContext()

	return (
		<div className={`card card_${theme}`}>
			{!forecast && <div>Loading data</div>}
			{forecast && (
				<>
					<div className="date_label">{forecast.date}</div>
					<img
						src={forecast.day.condition.icon}
						style={{ width: 100, height: 100 }}
						alt="weather_logo"
					/>
					<div className="forecast_temperature_label">
						{forecast.day.avgtemp_c}°C
					</div>
					<div className="condition_text_label">
						{forecast.day.condition.text}
					</div>
				</>
			)}
		</div>
	)
}

const Forecast = () => {
	const { theme, selectedCity } = useAppContext()
	const [days, setDays] = useState([])

	useEffect(() => {
		if (selectedCity) {
			fetchWeatherData(selectedCity).then((data) =>
				setDays(data.forecast.forecastday)
			)
		}
		return () => {
			setDays([])
		}
	}, [selectedCity])

	return (
		<div className={`forecast_container forecast_container_${theme}`}>
			{selectedCity && days.length && (
				<>
					<h2 className={`title_${theme}`}>Details</h2>
					<div className="cards_container">
						{days.map((forecast) => (
							<ForecastDay forecast={forecast} />
						))}
					</div>
				</>
			)}
		</div>
	)
}

export default Forecast
