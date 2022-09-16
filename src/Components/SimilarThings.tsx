import { motion } from "framer-motion";
import { useMemo } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { IGetResult, InfoSearch } from "../api";
import { makeImagePath } from "../utils";

const Tag = styled.p`
	font-size: 30px;
	font-weight: 700;
	padding: 50px 0px 0px 50px;
`;
const Row = styled(motion.div)`
	padding: 50px;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 30px;
	width: 100%;
`;
const Box = styled.div`
	height: 100%;
	background-color: #575656;
	box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
		rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
		rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px,
		rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px,
		rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
`;

const SimilarInfo = styled.div`
	padding: 15px;
`;
const Release = styled.p`
	font-weight: 700;
`;
const Overview = styled.p`
	padding-top: 20px;
`;
const BoxInfo = styled(motion.div)<{ bgPhoto: string }>`
	height: 150px;
	background-image: url(${(props) => props.bgPhoto});
	background-size: cover;
	background-repeat: no-repeat;
	font-size: 15px;
	position: relative;
	background-position: center center;
	cursor: pointer;
	p {
		left: 10px;
		position: absolute;
		bottom: 20px;
		color: ${(props) => props.theme.white.darker};
	}
`;

interface Title {
	title: string;
}
function SimilarThings({ title }: Title) {
	const { data, isLoading } = useQuery<IGetResult>(`search ${title}`, () =>
		InfoSearch(title)
	);

	const SimilarData = useMemo(() => {
		return data?.results?.filter((item) => item.backdrop_path !== null);
	}, [data]);

	return (
		<>
			<Tag>SimilarContents</Tag>
			<Row>
				{SimilarData?.slice(0, 9).map((item, index) => {
					return (
						<Box key={index}>
							<BoxInfo key={index} bgPhoto={makeImagePath(item.backdrop_path)}>
								<p>{item.title}</p>
							</BoxInfo>
							<SimilarInfo>
								<Release>{item.release_date.slice(0, 4)}</Release>
								<Overview>{item.overview.slice(0, 150)}</Overview>
							</SimilarInfo>
						</Box>
					);
				})}
			</Row>
		</>
	);
}

export default SimilarThings;
