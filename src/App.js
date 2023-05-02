import React from "react"
import { AppContextProvider } from "./store"
import Header from "./components/Header"
import Cities from "./components/Cities"
import Forecast from "./components/Forecast"

export function App() {
	return (
		<AppContextProvider>
			<Header />
			<Cities />
			<Forecast />
		</AppContextProvider>
	)
}

export default App
