import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getPopularTv, getTodayTv, getTopRankTv, IGetResult } from "../api";
import IconBox from "../Components/IconBox";
import DetailTv from "../Components/DetailTv";
import { IoArrowForward } from "react-icons/io5";
import { makeImagePath } from "../utils";
import {
	ArrowBtn,
	Banner,
	BigTv,
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

function Tv() {
	const navigate = useNavigate();
	const bigTvMatch = useMatch("tv/:tvId");
	const [tvIndex, setTvIndex] = useState(0);
	const [rankIndex, setRankIndex] = useState(0);
	const [popularIndex, setPopularIndex] = useState(0);
	const [leaving, setLeaving] = useState(false);
	const { scrollY } = useViewportScroll();
	const { data: TopTvData, isLoading: TopLoading } = useQuery<IGetResult>(
		"LatesTv",
		getTopRankTv
	);

	const { data: PopularData, isLoading: PopularLoading } = useQuery<IGetResult>(
		"PopularTv",
		getPopularTv
	);
	const { data: TodayData, isLoading: TodayLoading } = useQuery<IGetResult>(
		"TodayTv",
		getTodayTv
	);

	const incraseIndex = () => {
		if (TodayData) {
			if (leaving) return;
			toggleLeaving();
			const totalTv = TodayData.results.length - 1;
			const maxIndex = Math.floor(totalTv / offset) - 1;
			setTvIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
		}
	};

	const increasePopular = () => {
		if (PopularData) {
			if (leaving) return;
			toggleLeaving();
			const totalTv = PopularData.results.length - 1;
			const maxIndex = Math.floor(totalTv / offset) - 1;
			setPopularIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
		}
	};

	const incraseRank = () => {
		if (TopTvData) {
			if (leaving) return;
			toggleLeaving();
			const totalMovies = TopTvData.results.length - 1;
			const maxIndex = Math.floor(totalMovies / offset) - 1;
			setRankIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
		}
	};
	const toggleLeaving = () => {
		setLeaving((prev) => !prev);
	};

	// box가 클릭될때 id값 구하는 함수
	const onBoxClicked = (tvId: number) => {
		navigate(`/tv/${tvId}`);
	};

	const onOverlayClick = () => {
		navigate("/tv/");
	};

	const clickedTv = bigTvMatch?.params.tvId && +bigTvMatch.params.tvId;
	let offset = 6;

	return (
		<Wrapper>
			{TopLoading ? (
				<Logo
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
						bgPhoto={makeImagePath(TodayData?.results[0].backdrop_path || "")}
					>
						<Title>{TodayData?.results[0].name}</Title>
						<Overview>{TodayData?.results[0].overview}</Overview>
					</Banner>
					<SliderPar>
						<Slider>
							<TitleType>
								<h1>Series Tv</h1>
							</TitleType>
							<AnimatePresence onExitComplete={toggleLeaving}>
								<Row
									variants={rowVariants}
									initial="hidden"
									animate="visible"
									exit="exit"
									transition={{ type: "tween", duration: 1 }}
									key={tvIndex}
								>
									{TodayData?.results
										.slice(1)
										.slice(offset * tvIndex, offset * tvIndex + offset)
										.map((Tv) => {
											return (
												<Box
													bgPhoto={makeImagePath(Tv.backdrop_path)}
													key={Tv.id}
													layoutId={Tv.id + ""}
													variants={boxVariants}
													whileHover="hover"
													transition={{ type: "tween" }}
													initial="normal"
													onClick={() => onBoxClicked(Tv.id)}
												>
													<Info variants={infoVariants}>
														<h4>{Tv.name}</h4>
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
								<h1>Popular Tv</h1>
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
									{PopularData?.results
										.slice(1)
										.slice(
											offset * popularIndex,
											offset * popularIndex + offset
										)
										.map((Tv) => {
											return (
												<Box
													bgPhoto={makeImagePath(Tv.backdrop_path)}
													key={Tv.id}
													layoutId={Tv.id + ""}
													variants={boxVariants}
													whileHover="hover"
													transition={{ type: "tween" }}
													initial="normal"
													onClick={() => onBoxClicked(Tv.id)}
												>
													<Info variants={infoVariants}>
														<h4>{Tv.name}</h4>
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
								<h1>TopRank Tv</h1>
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
									{TopTvData?.results
										.slice(1)
										.slice(offset * rankIndex, offset * rankIndex + offset)
										.map((Tv, _index) => {
											return (
												<RankBox
													bgPhoto={makeImagePath(Tv.poster_path)}
													key={Tv.id}
													layoutId={Tv.id + ""}
													variants={boxVariants}
													whileHover="hover"
													transition={{ type: "tween" }}
													initial="normal"
													onClick={() => onBoxClicked(Tv.id)}
												>
													<RankNum>
														<h1>{offset * rankIndex + _index + 1}</h1>
													</RankNum>
													<Info variants={infoVariants}>
														<h4>{Tv.name}</h4>
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
						{bigTvMatch ? (
							<>
								<Overlay
									onClick={onOverlayClick}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
								/>
								<BigTv
									style={{ top: scrollY.get() + 100 }}
									layoutId={bigTvMatch.params.tvId}
								>
									{clickedTv && (
										<>
											<DetailTv tvId={clickedTv} />
										</>
									)}
								</BigTv>
							</>
						) : null}
					</AnimatePresence>
				</>
			)}
		</Wrapper>
	);
}

export default Tv;
