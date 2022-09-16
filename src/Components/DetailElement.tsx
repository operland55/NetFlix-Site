import { motion } from "framer-motion";
import styled from "styled-components";

export const BigMovie = styled(motion.div)`
	position: absolute;
	width: 40vw;
	height: 80vh;
	left: 0;
	right: 0;
	margin: 0 auto;
	background-color: ${(props) => props.theme.black.lighter};
	border-radius: 15px;
	overflow: hidden;
	border-radius: 15px;
`;
export const BigCover = styled.div`
	background-size: cover;
	background-position: center, center;
	width: 100%;
	height: 500px;
	position: relative;
`;
export const CloseIcon = styled(motion.svg)`
	position: absolute;
	right: 15px;
	top: 20px;
	cursor: pointer;
`;
export const BigTitle = styled.h3`
	color: ${(props) => props.theme.white.lighter};
	width: 50%;
	position: absolute;
	bottom: 20%;
	left: 50px;
	font-size: 35px;
	font-weight: 700;
`;
export const Icon = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	position: absolute;
	bottom: 40px;
	left: 50px;
	font-weight: 700;
	cursor: pointer;
`;

export const PlayBtn = styled.button`
	border-radius: 30px;
	padding: 10px 50px;
	border: none;
	background-color: #fff;
	cursor: pointer;
	&:hover {
		background-color: gray;
	}
`;
export const Info = styled.div`
	width: 100%;
	padding-left: 50px;
	display: flex;
`;
export const InfoBox = styled.div`
	flex: 2;
	div {
		padding-top: 30px;
		display: flex;
		gap: 40px;
	}
`;

export const InfoBox2 = styled.div`
	flex: 1;
	padding-top: 30px;
	padding-left: 10px;
	display: flex;
	flex-direction: column;
	gap: 10px;
`;
export const Release = styled.p`
	font-weight: 500;
`;
export const Runtime = styled.p``;
export const OverView = styled.h3`
	padding-top: 30px;
	line-height: 25px;
`;
export const Genre = styled.p`
	color: gray;
`;

export const Point = styled.p`
	span {
		color: gray;
	}
`;
export const GenreName = styled.span`
	color: ${(props) => props.theme.white.lighter};
`;
