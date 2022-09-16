import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import { IoArrowForward } from "react-icons/io5";
import styled from "styled-components";
import {
	getDetailMovies,
	getMovies,
	getPopularMovie,
	getRankMovie,
	IGetDetailMovie,
	IGetResult,
} from "../api";
import DetailMovies from "../Components/DetailMovie";
import {
	ArrowBtn,
	Banner,
	BigMovie,
	Box,
	boxVariants,
	Info,
	infoVariants,
	Logo,
	Overlay,
	Overview,
	RankBox,
	RankNum,
	Row,
	rowVariants,
	Slider,
	SliderPar,
	Title,
	TitleType,
	Wrapper,
} from "../Components/Element";
import IconBox from "../Components/IconBox";
import { makeImagePath } from "../utils";

const offset = 6;
const index = 0;
function Movies() {
	const navigate = useNavigate();
	const bigMovieMatch = useMatch("/movies/:movieId");
	const { scrollY } = useViewportScroll();
	const { data: movies, isLoading } = useQuery<IGetResult>("movies", getMovies);
	const { data: popular, isLoading: popularLoading } = useQuery<IGetResult>(
		"popular",
		getPopularMovie
	);
	const { data: rankData, isLoading: rankLoading } = useQuery<IGetResult>(
		"Rank",
		() => getRankMovie(3)
	);

	const [movieIndex, setMovieIndex] = useState(0);
	const [rankIndex, setRankIndex] = useState(0);
	const [popularIndex, setPopularIndex] = useState(0);
	const [leaving, setLeaving] = useState(false);

	const incraseIndex = () => {
		if (movies) {
			if (leaving) return;
			toggleLeaving();
			const totalMovies = movies.results.length - 1;
			const maxIndex = Math.floor(totalMovies / offset) - 1;
			setMovieIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
		}
	};

	const increasePopular = () => {
		if (popular) {
			if (leaving) return;
			toggleLeaving();
			const totalMovies = popular.results.length - 1;
			const maxIndex = Math.floor(totalMovies / offset) - 1;
			setPopularIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
		}
	};

	const incraseRank = () => {
		if (rankData) {
			if (leaving) return;
			toggleLeaving();
			const totalMovies = rankData.results.length - 1;
			const maxIndex = Math.floor(totalMovies / offset) - 1;
			setRankIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
		}
	};
	const toggleLeaving = () => {
		setLeaving((prev) => !prev);
	};

	// box가 클릭될때 id값 구하는 함수
	const onBoxClicked = (movieId: number) => {
		navigate(`/movies/${movieId}`);
	};

	const onOverlayClick = () => {
		navigate(`/movies`);
	};

	const clickedMovie =
		bigMovieMatch?.params.movieId && +bigMovieMatch.params.movieId;
	let offset = 6;
	return (
		<Wrapper>
			{isLoading ? (
				<Logo
					whileHover="active"
					initial="normal "
					xmlns="http://www.w3.org/2000/svg"
					width="1024"
					height="276.742"
					viewBox="0 0 1024 276.742"
				>
					<motion.path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
				</Logo>
			) : (
				<>
					<Banner
						bgPhoto={makeImagePath(movies?.results[0].backdrop_path || "")}
					>
						<Title>{movies?.results[0].title}</Title>
						<Overview>{movies?.results[0].overview}</Overview>
					</Banner>

					<SliderPar>
						<Slider>
							<TitleType>
								<h1>Screening</h1>
							</TitleType>
							<AnimatePresence onExitComplete={toggleLeaving}>
								<Row
									variants={rowVariants}
									initial="hidden"
									animate="visible"
									exit="exit"
									transition={{ type: "tween", duration: 1 }}
									key={movieIndex}
								>
									{movies?.results
										.slice(1)
										.slice(offset * movieIndex, offset * movieIndex + offset)
										.map((movie) => {
											return (
												<Box
													layoutId={movie.id + ""}
													variants={boxVariants}
													whileHover="hover"
													bgPhoto={makeImagePath(movie.backdrop_path)}
													key={movie.id}
													transition={{ type: "tween" }}
													initial="normal"
													onClick={() => onBoxClicked(movie.id)}
												>
													<Info variants={infoVariants}>
														<h4>{movie.title}</h4>
													</Info>
													<IconBox />
												</Box>
											);
										})}
								</Row>
							</AnimatePresence>
							<ArrowBtn onClick={incraseIndex}>
								<IoArrowForward style={{ fontSize: 30 }} />
							</ArrowBtn>
						</Slider>
						<Slider>
							<TitleType>
								<h1>Popular Movie</h1>
							</TitleType>
							<AnimatePresence onExitComplete={toggleLeaving}>
								<Row
									variants={rowVariants}
									initial="hidden"
									animate="visible"
									exit="exit"
									transition={{ type: "tween", duration: 1 }}
									key={popularIndex}
								>
									{popular?.results
										.slice(1)
										.slice(
											offset * popularIndex,
											offset * popularIndex + offset
										)
										.map((movie) => {
											return (
												<Box
													layoutId={movie.id + ""}
													variants={boxVariants}
													whileHover="hover"
													bgPhoto={makeImagePath(movie.backdrop_path)}
													key={movie.id}
													transition={{ type: "tween" }}
													initial="normal"
													onClick={() => onBoxClicked(movie.id)}
												>
													<Info variants={infoVariants}>
														<h4>{movie.title}</h4>
													</Info>
													<IconBox />
												</Box>
											);
										})}
								</Row>
							</AnimatePresence>
							<ArrowBtn onClick={increasePopular}>
								<IoArrowForward style={{ fontSize: 30 }} />
							</ArrowBtn>
						</Slider>

						<Slider>
							<TitleType>
								<h1>Rank Movie</h1>
							</TitleType>
							<AnimatePresence onExitComplete={toggleLeaving}>
								<Row
									variants={rowVariants}
									initial="hidden"
									animate="visible"
									exit="exit"
									transition={{ type: "tween", duration: 1 }}
									key={rankIndex}
								>
									{rankData?.results
										.slice(1)
										.slice(offset * rankIndex, offset * rankIndex + offset)
										.map((movie, _index) => {
											return (
												<RankBox
													layoutId={movie.id + ""}
													variants={boxVariants}
													whileHover="hover"
													bgPhoto={makeImagePath(movie.poster_path)}
													key={movie.id}
													transition={{ type: "tween" }}
													initial="normal"
													onClick={() => onBoxClicked(movie.id)}
												>
													<RankNum>
														<h1>{offset * rankIndex + _index + 1}</h1>
													</RankNum>
													<Info variants={infoVariants}>
														<h4>{movie.title}</h4>
													</Info>
													<IconBox />
												</RankBox>
											);
										})}
								</Row>
							</AnimatePresence>
							<ArrowBtn onClick={incraseRank}>
								<IoArrowForward style={{ fontSize: 30 }} />
							</ArrowBtn>
						</Slider>
					</SliderPar>

					<AnimatePresence>
						{bigMovieMatch ? (
							<>
								<Overlay
									onClick={onOverlayClick}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
								/>
								<BigMovie
									style={{ top: scrollY.get() + 100 }}
									layoutId={bigMovieMatch.params.movieId}
								>
									{clickedMovie && (
										<>
											<DetailMovies movieId={clickedMovie} />
										</>
									)}
								</BigMovie>
							</>
						) : null}
					</AnimatePresence>
				</>
			)}
		</Wrapper>
	);
}

export default Movies;
