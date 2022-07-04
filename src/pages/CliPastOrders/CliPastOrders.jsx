import { useEffect, useState } from "react";
import axios from "axios";

import { Box, Typography, Grid, Button } from "@mui/material";
import styles from "./styles/style";

import NavBar from "../../components/Navbar";
import PastOrder from "./components/pastOrder";

const ClientsPastOrders = () => {
	const [orders, setOrders] = useState([]);
	useEffect(() => {
		const username = "username";
		const getOrders = async () => {
			const req = await axios.get(
				`http://localhost:8080/api/orders/${username}`
			);
			setOrders(req.data);
		};
		getOrders();
	}, []);

	return (
		<>
			<NavBar type={"user"} />
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
