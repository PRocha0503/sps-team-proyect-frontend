import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Box, Typography, Grid, Button } from "@mui/material";
import styles from "./styles/style";
import validateJWT from "../../helpers/validateJWT";

import NavBar from "../../components/Navbar";
import PastOrder from "./components/pastOrder";

const ClientsPastOrders = () => {
	const navigate = useNavigate();

	const [orders, setOrders] = useState([]);
	const { token } = JSON.parse(localStorage.getItem("token")) || {};

	useEffect(() => {
		const validate = async () => {
			try {
				const user = await validateJWT(token);
				// setUser(user);
			} catch (err) {
				navigate("/login");
			}
		};
		const getOrders = async () => {
			const req = await axios({
				method: "GET",
				url: `http://localhost:8080/api/orders`,
				headers: {
					"x-token": token,
				},
			});
			setOrders(req.data);
		};
		validate();
		getOrders();
	}, []);

	return (
		<>
			<NavBar type={"customer"} />
			<Box sx={{ ...styles.root }}>
				<Box sx={{ ...styles.center }}>
					<Box sx={{ ...styles.text }}>
						<Typography variant="h1">Past Orders</Typography>
						<Typography variant="desc" align="center">
							Check out all the orders you have made in the past.
						</Typography>
					</Box>
				</Box>
				<Box sx={{ ...styles.pastOrders }}>
					{Object.keys(orders).map((key, index) => {
						return <PastOrder order={orders[key]} />;
					})}
				</Box>
			</Box>
		</>
	);
};

export default ClientsPastOrders;
