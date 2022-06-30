import { useEffect, useState } from "react";
import axios from "axios";

import { Box, Typography, Grid, Button } from "@mui/material";
import styles from "./styles/style";

import NavBar from "../../components/Navbar";

const ClientsPastOrders = () => {
	console.log("HEREEE");
	useEffect(() => {}, []);

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
			</Box>
		</>
	);
};

export default ClientsPastOrders;
