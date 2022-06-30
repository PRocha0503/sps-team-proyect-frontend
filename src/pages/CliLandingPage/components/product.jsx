import { useState } from "react";

import {
	Box,
	Typography,
	Card,
	CardMedia,
	CardContent,
	Button,
	TextField,
} from "@mui/material";
import { style } from "@mui/system";

import styles from "../styles/product";
import axios from "axios";

const Product = ({ product, modal }) => {
	const [coupon, setCoupon] = useState(null);
	const buyItem = async (product) => {
		try {
			const req = await axios({
				method: "post",
				url: "http://localhost:8080/api/orders",
				headers: {},
				data: {
					username: "username",
					productName: product.name,
					code: coupon ? coupon : "no",
				},
			});
			modal(true);
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<Card sx={{ ...styles.root }}>
			<CardMedia
				sx={{ ...styles.img }}
				component="img"
				image={product.image}
				alt="Product Image"
			/>
			<CardContent sx={{ ...styles.text }}>
				<Typography gutterBottom variant="h5">
					{product.name}
				</Typography>
				<Typography variant="body2" color="primary.blue">
					{product.owner}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{product.description}
				</Typography>
			</CardContent>
			<Box sx={{ ...styles.coupon }}>
				<TextField
					id="coupon"
					label="Coupon"
					value={coupon}
					onChange={(e) => setCoupon(e.target.value)}
					sx={{ ...styles.txtCoupon }}
				/>
				<Button sx={{ ...styles.button }} onClick={() => buyItem(product)}>
					${product.price}
				</Button>
			</Box>
		</Card>
	);
};
export default Product;
