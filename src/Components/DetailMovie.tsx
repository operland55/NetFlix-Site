import { motion } from "framer-motion";
import { useQuery } from "react-query";
import styled from "styled-components";
import {
	getDetailMovies,
	getPopularMovie,
	getVideoMovie,
	IGetDetailMovie,
	IGetResult,
} from "../api";
import { makeImagePath } from "../utils";
import { IconList } from "./IconBox";
import Close from "../close.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SimilarThings from "./SimilarThings";
import {
	BigTitle,
	CloseIcon,
	Genre,
	GenreName,
	Icon,
	Info,
	InfoBox,
	InfoBox2,
	OverView,
	PlayBtn,
	Point,
	Release,
	BigCover,
	Runtime,
} from "./DetailElement";

interface movieId {
	movieId: number;
}

function DetailMovies({ movieId }: movieId) {
	const Navigate = useNavigate();
	const { data: popularData, isLoading: popularLoading } = useQuery<IGetResult>(
		"popular",
		getPopularMovie
	);
	const { data: Detail, isLoading: DetailLoading } = useQuery<IGetDetailMovie>(
		"DetailMovie",
		() => getDetailMovies(movieId)
	);

	const CloseClick = () => {
		Navigate(-1);
	};
	return (
		<>
			<>
				{" "}
				<BigCover
					style={{
						backgroundImage: `linear-gradient(to top, #3f3838, transparent),url(${makeImagePath(
							Detail?.backdrop_path || ""
						)})`,
					}}
				>
					<CloseIcon
						onClick={CloseClick}
						xmlns="http://www.w3.org/2000/svg"
						height="34px"
						viewBox="0 0 24 24"
						width="34px"
						fill="#fff"
					>
						<path d="M0 0h24v24H0z" fill="none" />
						<path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
					</CloseIcon>
					<BigTitle>{Detail?.title}</BigTitle>
					<Icon>
						<PlayBtn>Play</PlayBtn>

						<motion.svg
							xmlns="http://www.w3.org/2000/svg"
							height="33px"
							viewBox="0 0 24 24"
							width="33px"
							fill="#fff"
						>
							<path d="M0 0h24v24H0z" fill="none" />
							<path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
						</motion.svg>
						<motion.svg
							xmlns="http://www.w3.org/2000/svg"
							height="33px"
							viewBox="0 0 24 24"
							width="33px"
							fill="#fff"
						>
							<path d="M0 0h24v24H0V0z" fill="none" />
							<path d="M13.11 5.72l-.57 2.89c-.12.59.04 1.2.42 1.66.38.46.94.73 1.54.73H20v1.08L17.43 18H9.34c-.18 0-.34-.16-.34-.34V9.82l4.11-4.1M14 2L7.59 8.41C7.21 8.79 7 9.3 7 9.83v7.83C7 18.95 8.05 20 9.34 20h8.1c.71 0 1.36-.37 1.72-.97l2.67-6.15c.11-.25.17-.52.17-.8V11c0-1.1-.9-2-2-2h-5.5l.92-4.65c.05-.22.02-.46-.08-.66-.23-.45-.52-.86-.88-1.22L14 2zM4 9H2v11h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1z" />
						</motion.svg>
					</Icon>
				</BigCover>
				<Info>
					<InfoBox>
						<div>
							<Release>Release: {Detail?.release_date.slice(0, 4)}</Release>
							<Runtime>{Detail?.runtime}</Runtime>
						</div>
						<OverView>{Detail?.overview}</OverView>
					</InfoBox>

					<InfoBox2>
						<Genre>
							<span>Genre:</span>{" "}
							{Detail?.genres.map((item, index) => {
								return <GenreName key={index}>{item.name},</GenreName>;
							})}
						</Genre>
						<Point>
							<span>Movie Point:</span> {Detail?.tagline}
						</Point>
					</InfoBox2>
				</Info>
				<SimilarThings title={Detail?.title.slice(0, 5) || ""}></SimilarThings>
			</>
		</>
	);
}
{
	/* <BigVideo
				width="100%"
				height="400"
				src={`https://www.youtube.com/embed/${Video?.results[0].key}`}
				title="YouTube video player"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			></BigVideo> */
}
export default DetailMovies;
