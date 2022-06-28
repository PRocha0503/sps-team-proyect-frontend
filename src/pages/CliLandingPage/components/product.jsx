import {
	Box,
	Typography,
	Card,
	CardActionArea,
	CardMedia,
	CardContent,
	Button,
	TextField,
} from "@mui/material";
import { style } from "@mui/system";

import styles from "../styles/product";

const Product = () => {
	return (
		<Card sx={{ ...styles.root }}>
			<CardMedia
				sx={{ ...styles.img }}
				component="img"
				height="200"
				image="https://5spotrestaurant.com/wp-content/uploads/2021/03/uber-eats-logo-1-2048x2048.png"
				alt="Product Image"
			/>
			<CardContent>
				<Typography gutterBottom variant="h5">
					Lizard
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Lizards are a widespread group of squamate reptiles, with over 6,000
					species, ranging across all continents except Antarctica
				</Typography>
			</CardContent>
			<Box sx={{ ...styles.coupon }}>
				<TextField
					id="coupon"
					label="Coupon"
					variant="outlined"
					sx={{ ...styles.txtCoupon }}
				/>
				<Button sx={{ ...styles.button }}>Buy</Button>
			</Box>
		</Card>
	);
};
export default Product;
