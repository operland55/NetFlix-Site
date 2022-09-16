import { motion, useViewportScroll } from "framer-motion";
import { useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import {
	useLocation,
	useMatch,
	useNavigate,
	useNavigationType,
} from "react-router-dom";
import styled from "styled-components";
import { IGetResult, InfoSearch } from "../api";
import DetailMovies from "../Components/DetailMovie";
import IconBox from "../Components/IconBox";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
	background-color: black;
`;
const Row = styled(motion.div)`
	margin-top: 150px;
	display: grid;
	gap: 10px;
	grid-template-columns: repeat(6, 1fr);
	position: absolute;
	width: 100%;
`;
const Box = styled(motion.div)<{ bgPhoto: string }>`
	background-color: #fff;
	height: 200px;
	background-image: url(${(props) => props.bgPhoto});
	background-size: cover;
	font-size: 66px;
	background-position: center center;
	cursor: pointer;
	&:first-child {
		transform-origin: center left;
	}
	&:nth-child(7) {
		transform-origin: center left;
	}
	&:nth-child(13) {
		transform-origin: center left;
	}
	&:nth-child(6n) {
		transform-origin: center right;
	}
`;

const Info = styled(motion.div)`
	opacity: 0;
	position: relative;
	width: 100%;

	h4 {
		color: ${(props) => props.theme.white.lighter};
		text-align: left;
		font-size: 18px;
		position: absolute;
		top: 100px;
	}
`;
const Overlay = styled(motion.div)`
	position: absolute;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	opacity: 0;
	position: fixed;
`;
const BigMovie = styled(motion.div)`
	position: absolute;
	width: 40vw;
	height: 80vh;
	left: 0;
	right: 0;
	margin: 0 auto;
	background-color: ${(props) => props.theme.black.lighter};
	border-radius: 15px;
	overflow-y: auto;
`;
const BigCover = styled.img`
	background-size: cover;
	background-position: center, center;
	width: 100%;
	height: 400px;
`;

const CloseIcon = styled(motion.svg)`
	position: absolute;
	right: 15px;
	top: 20px;
	cursor: pointer;
`;
const BigTitle = styled.h3`
	color: ${(props) => props.theme.white.lighter};
	width: 50%;
	position: absolute;
	bottom: 20%;
	left: 50px;
	font-size: 35px;
	font-weight: 700;
`;
const Icon = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	position: absolute;
	bottom: 40px;
	left: 50px;
	font-weight: 700;
	cursor: pointer;
`;

const PlayBtn = styled.button`
	border-radius: 30px;
	padding: 10px 50px;
	border: none;
	background-color: #fff;
	cursor: pointer;
	&:hover {
		background-color: gray;
	}
`;

const boxVariants = {
	normal: {
		scale: 1,
	},

	hover: {
		opacity: 1,
		scale: 1.3,
		y: -80,
		transition: {
			delay: 0.5,
			duration: 0.5,
			type: "tween",
		},
	},
};
const infoVariants = {
	hover: {
		opacity: 1,
		transition: {
			delay: 0.5,
			duration: 0.5,
			type: "tween",
		},
	},
};
function Search() {
	const SearchMatch = useMatch(`search/:SearchId`);
	const navigate = useNavigate();
	const location = useLocation();
	const { scrollY } = useViewportScroll();
	const keyword = useMemo(() => {
		return new URLSearchParams(location.search).get("keyword") ?? undefined;
	}, [location]);
	const { data, isLoading } = useQuery<IGetResult>(`search-${keyword}`, () =>
		InfoSearch(keyword!)
	);

	const onBoxClicked = (SearchId: number) => {
		navigate(`/search/${SearchId}`);
	};

	const onOverlayClick = () => {
		navigate(-1);
	};
	const CloseClick = () => {
		navigate(-1);
	};

	let imgData = useMemo(() => {
		return (
			data?.results.filter((item, index) => item.backdrop_path !== null) ||
			undefined
		);
	}, [data]);

	const clickedMovie =
		SearchMatch?.params.SearchId && +SearchMatch.params.SearchId;
	return (
		<>
			<Wrapper>
				<Row>
					{imgData?.map((item, index) => (
						<Box
							bgPhoto={makeImagePath(item.backdrop_path)}
							key={index}
							onClick={() => onBoxClicked(imgData![index].id)}
							layoutId={item.id + ""}
							variants={boxVariants}
							whileHover="hover"
							initial="normal"
						>
							<Info variants={infoVariants}>
								<h4>{item.title}</h4>
							</Info>
							<IconBox></IconBox>
						</Box>
					))}
				</Row>
				{SearchMatch ? (
					<>
						<Overlay
							onClick={onOverlayClick}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						/>
						<BigMovie
							style={{ top: scrollY.get() + 100 }}
							layoutId={SearchMatch.params.SearchId}
						>
							{clickedMovie && (
								<>
									<DetailMovies movieId={clickedMovie} />
								</>
							)}
						</BigMovie>
					</>
				) : null}
			</Wrapper>
		</>
	);
}

export default Search;
