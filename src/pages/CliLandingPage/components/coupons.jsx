import { Box, Typography, Button } from "@mui/material";

import styles from "../styles/coupon";

const Coupon = ({ item }) => {
	const setImage = (percentage) => {
		switch (percentage) {
			case "5":
				return "https://cdn.pixabay.com/photo/2017/07/26/04/38/discount-2540425_960_720.png";
			case "10":
				return "https://www.pngmart.com/files/21/10-Off-PNG-Pic.png";
			case "15":
				return "https://mx.isafyi.com/wp-content/uploads/2016/07/15porciento1.png";
			default:
				return "https://i.pinimg.com/originals/1d/ee/2c/1dee2c2d20a77b26fde323839c551e53.png";
		}
	};
	return (
		<Box sx={{ ...styles.root }}>
			<Box
				sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
			>
				<Box
					component="img"
					sx={{
						...styles.image,
					}}
					src={setImage(item.percentage)}
				/>
				<Box>
					<Typography variant="h4">{item.code}</Typography>
					<Typography variant="desc" color="black">
						{`${item.percentage}% at ${item.item.name}`}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default Coupon;
