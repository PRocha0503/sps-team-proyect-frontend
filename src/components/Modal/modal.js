import styles from "./styles/style";
import { Modal, Paper, Box, Typography } from "@mui/material";

const ModalSkeleton = ({ open, children }) => {
	console.log("modal");
	return (
		<Modal open={open}>
			<Box sx={{ ...styles.modal }}>{children}</Box>
		</Modal>
	);
};

export default ModalSkeleton;
