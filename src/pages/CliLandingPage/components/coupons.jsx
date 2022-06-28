import { Box, Typography } from "@mui/material";

import styles from "../styles/coupon";

const Coupon = () => {
	return (
		<Box sx={{ ...styles.root }}>
			<Typography variant="h3">10% off at Super Cake</Typography>
			<Box sx={{ ...styles.code }}>
				<Typography variant="h4">A9839JPS</Typography>
			</Box>
		</Box>
	);
};

export default Coupon;
