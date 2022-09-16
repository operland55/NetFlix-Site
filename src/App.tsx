import { useState } from "react";
import styled from "styled-components";
import { Route, Routes, BrowserRouter, Router } from "react-router-dom";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./HomeComponents/Header";
import Movies from "./Routes/Movies";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/tv" element={<Tv />} />
				<Route path="/tv/:id" element={<Tv />} />
				<Route path="/search" element={<Search />} />
				<Route path="/search/:id" element={<Search />} />
				<Route path="/" element={<Home />} />
				<Route path="browse/:id" element={<Home />} />

				<Route path="movies" element={<Movies />} />
				<Route path="movies/:movieId" element={<Movies />} />
				{/* <Route path="favorites" element={<Home />} /> */}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
