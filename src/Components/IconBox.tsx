import { motion } from "framer-motion";
import styled from "styled-components";

const IconInfo = styled(motion.div)`
	display: flex;
	gap: 10px;
	background-color: transparent;
	position: relative;
	width: 100%;
	height: 100%;
	svg {
		margin-right: 5px;
		background-color: #fff;
		border-radius: 50%;
	}
`;
export const IconList = styled(motion.div)`
	padding: 10px;
	width: 100%;
	position: absolute;
	bottom: 0;
	display: flex;
	align-items: flex-end;
	background-color: #181818;
	padding: 13px;
`;

const ArrowIcon = styled(motion.div)`
	svg {
		position: absolute;
		bottom: 15px;
		right: 0px;
	}
`;

export const BoxIcon = {
	normal: {
		opacity: 0,
	},
	hover: {
		opacity: 1,
		transition: {
			delay: 0.3,
			duration: 0.3,
			type: "tween",
		},
	},
};
function IconBox() {
	return (
		<>
			<IconInfo variants={BoxIcon} initial="normal" whileHover="hover">
				<IconList>
					<motion.svg
						xmlns="http://www.w3.org/2000/svg"
						height="35px"
						viewBox="0 0 24 24"
						width="35px"
						fill="#black"
					>
						<path d="M0 0h24v24H0z" fill="none" />
						<motion.path d="M8 5v14l11-7z" />
					</motion.svg>
					<motion.svg
						xmlns="http://www.w3.org/2000/svg"
						height="33px"
						viewBox="0 0 24 24"
						width="33px"
						fill="#000000"
					>
						<path d="M0 0h24v24H0z" fill="none" />
						<path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
					</motion.svg>
					<motion.svg
						xmlns="http://www.w3.org/2000/svg"
						height="33px"
						viewBox="0 0 24 24"
						width="33px"
						fill="#000000"
					>
						<path d="M0 0h24v24H0V0z" fill="none" />
						<path d="M13.11 5.72l-.57 2.89c-.12.59.04 1.2.42 1.66.38.46.94.73 1.54.73H20v1.08L17.43 18H9.34c-.18 0-.34-.16-.34-.34V9.82l4.11-4.1M14 2L7.59 8.41C7.21 8.79 7 9.3 7 9.83v7.83C7 18.95 8.05 20 9.34 20h8.1c.71 0 1.36-.37 1.72-.97l2.67-6.15c.11-.25.17-.52.17-.8V11c0-1.1-.9-2-2-2h-5.5l.92-4.65c.05-.22.02-.46-.08-.66-.23-.45-.52-.86-.88-1.22L14 2zM4 9H2v11h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1z" />
					</motion.svg>
				</IconList>
				<ArrowIcon>
					<motion.svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 0 24 24"
						width="24px"
						fill="#000000"
					>
						<path d="M0 0h24v24H0z" fill="none" />
						<path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
					</motion.svg>
				</ArrowIcon>
			</IconInfo>
		</>
	);
}

export default IconBox;
