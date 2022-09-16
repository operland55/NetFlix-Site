const API_KEY = "bb50b072ab393b23b85d0c258de3c425";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
	id: number;
	backdrop_path: string;
	poster_path: string;
	title: string;
	overview: string;
	name: string;
	genre_ids: number[];
	release_date: string;
}

export interface IGetResult {
	dates: { maximum: string; minimum: string };
	page: number;
	results: IMovie[];
	total_pages: number;
	total_results: number;
}

export interface IGetDetailMovie {
	backdrop_path: string;
	id: number;
	original_title: string;
	overview: string;
	poster_path: string;
	release_date: string;
	runtime: number;
	title: string;
	tagline: string;
	name: string;
	first_air_date: string;
	genres: [
		{
			id: number;
			name: string;
		}
	];
}


export function getMovies() {
	return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

export function getPopularMovie() {
	return fetch(
		`${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=en-US&page=10`
	).then((response) => response.json());
}

export function getRankMovie(page: number) {
	return fetch(
		`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
	).then((response) => response.json());
}

export function getDetailMovies(movieId: number) {
	return fetch(
		`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
	).then((response) => response.json());
}
export function getVideoMovie(movieId: number) {
	return fetch(`
https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=bb50b072ab393b23b85d0c258de3c425&language=en-US`).then(
		(response) => response.json()
	);
}

// Tv 시리즈

export function getTopRankTv() {
	return fetch(
		`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=2`
	).then((response) => response.json());
}

export function getPopularTv() {
	return fetch(
		`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=3`
	).then((response) => response.json());
}
export function getTodayTv() {
	return fetch(`
	https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`).then(
		(response) => response.json()
	);
}

export function getDetailTv(tvId: number) {
	return fetch(`
	https://api.themoviedb.org/3/tv/${tvId}?api_key=${API_KEY}&language=en-US`).then(
		(response) => response.json()
	);
}

// search

export function InfoSearch(search: string) {
	return fetch(
		`https://api.themoviedb.org/3/search/movie?api_key=bb50b072ab393b23b85d0c258de3c425&language=en-US&query=${search}&page=1&include_adult=false`
	).then((response) => response.json());
}
