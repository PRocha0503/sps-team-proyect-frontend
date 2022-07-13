import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Box, Typography, Grid, Button } from "@mui/material";
import styles from "./styles/style";
import validateJWT from "../../helpers/validateJWT";
import isNewCustomer from "../../helpers/isNewCustomer";

import Coupon from "./components/coupons";
import Product from "./components/product";
import ModalSkeleton from "../../components/Modal/modal";
import NavBar from "../../components/Navbar";
import ca from "date-fns/esm/locale/ca/index.js";

const ClientLandingPage = () => {
	const navigate = useNavigate();

	const [user, setUser] = useState();
	const [products, setProducts] = useState([]);
	const [coupons, setCoupons] = useState([]);
	const [modal, setModal] = useState(false);
	const [category, setCategory] = useState("All Products");
	const { token } = JSON.parse(localStorage.getItem("token")) || {};

	useEffect(() => {
		const validate = async () => {
			try {
				const user = await validateJWT(token);
				if (user.type == "business") {
					navigate("/business/products");
				}
				try {
					// await isNewCustomer(token);
				} catch (error) {
					console.log(error);
					navigate("/clients/profile");
				}
				setUser(user);
			} catch (err) {
				navigate("/login");
			}
		};

		const getProducts = async () => {
			const { data } = await axios({
				method: "GET",
				url: `http://localhost:8080/api/products/all`,
				headers: {
					"x-token": token,
				},
			});

			const p = Object.keys(data).map(function (key) {
				return data[key];
			});
			const categories = {};
			p.map((item, i) => {
				if (item.category in categories) {
					categories[item.category].push(item);
				} else {
					categories[item.category] = [item];
				}
			});

			setProducts(categories);
		};
		const getCoupons = async () => {
			const req = await axios({
				method: "GET",
				url: `http://localhost:8080/api/coupons/all`,
				headers: {
					"x-token": token,
				},
			});
			setCoupons(req.data);
		};
		validate();
		getProducts();
		getCoupons();
	}, []);

	const modalContent = () => {
		return (
			<Box>
				<Typography variant="h5" color="black">
					Congratulations!
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Your order has been placed successfully.
				</Typography>
				<Button
					sx={{ ...styles.modalButton }}
					onClick={() => {
						setModal(false);
					}}
				>
					Close
				</Button>
			</Box>
		);
	};

	return (
		<>
			<NavBar type={"customer"} user={user} />
			{modal ? (
				<ModalSkeleton open={modal}>{modalContent()}</ModalSkeleton>
			) : (
				<></>
			)}
			<Box sx={{ ...styles.root }}>
				<Box sx={{ ...styles.center }}>
					<Box sx={{ ...styles.text }}>
						<Typography variant="h1">Marketplace</Typography>
						<Typography variant="desc" align="center">
							Here you can buy different products and help your community! Many
							of the products have coupons so be sure to check those out
						</Typography>
					</Box>
				</Box>
				<Typography variant="h2" sx={{ marginBottom: 4 }}>
					Coupons
				</Typography>
				<Box
					sx={{
						...styles.couponsContainer,
					}}
				>
					{Object.keys(coupons).map((key, index) => {
						return <Coupon item={coupons[key]} />;
					})}
				</Box>
				<Typography variant="h2" sx={{ marginBottom: 4, marginTop: 4 }}>
					Products
				</Typography>
				{/* Categories */}
				<Button
					sx={{ ...styles.cat }}
					onClick={() => setCategory("All Products")}
				>
					All Products
				</Button>
				{Object.keys(products).map((key, index) => {
					return (
						<Button
							sx={{
								...styles.cat,
								color: category == key ? "black" : "primary.main",
							}}
							onClick={() => setCategory(key)}
						>
							{key}
						</Button>
					);
				})}

				{Object.keys(products).map((key, index) => {
					console.log(category);
					if (category == "All Products") {
						return (
							<>
								<Typography
									variant="h4"
									sx={{
										color: "white",
										marginTop: "1rem",
										marginBottom: "1rem",
									}}
								>
									{key.toUpperCase()}
								</Typography>
								<Grid container spacing={3}>
									{products[key].map((item, i) => {
										return (
											<Grid item xs={6} md={3}>
												<Product product={item} modal={setModal} />
											</Grid>
										);
									})}
								</Grid>
							</>
						);
					} else {
						if (key == category) {
							console.log("HERE");
							return (
								<>
									<Typography
										variant="h4"
										sx={{
											color: "white",
											marginTop: "1rem",
											marginBottom: "1rem",
										}}
									>
										{key.toUpperCase()}
									</Typography>
									<Grid container spacing={3}>
										{products[key].map((item, i) => {
											return (
												<Grid item xs={6} md={3}>
													<Product product={item} modal={setModal} />
												</Grid>
											);
										})}
									</Grid>
									;
								</>
							);
						}
					}
				})}

				{/* <Grid container spacing={3}>
				// 	{Object.keys(products	console.log("HERE");).map((key, index) => {
				// 		return (
				// 			<Grid item xs={6} md={3}>
				// 				<Product product={products[key]} modal={setModal} />
				// 			</Grid>
				// 		);
				// 	})}
				// </Grid> */}
			</Box>
		</>
	);
};

export default ClientLandingPage;
