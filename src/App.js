import React from "react"
import { AppContextProvider } from "./store"
import Header from "./components/Header"
import Dashboard from "./components/Dashboard"
import Details from "./components/Details"

export function App() {
	return (
		<AppContextProvider>
			<Header />
			<Dashboard />
			<Details />
		</AppContextProvider>
	)
}

export default App
