import { Box, Typography, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from 'axios';

import styles from "./styles/style";
import { useEffect, useState } from "react";

const ClientNavBar = () => {
	const user = localStorage.getItem('token');
	const token = JSON.parse(user)['token'];
	const [userData, setUserData] = useState({});

	useEffect(() => {
		const getUserType = async () => {
			try {
				const userType = await axios.get(`${process.env.REACT_APP_API}/api/auth/validate`, {
					headers: {
						'x-token': token,
					}
				});
				setUserData(userType.data);
			}
			catch (err) {
				console.log(err);
			}
		};
		getUserType();
	}, []);
	
	const navItems = [
		{
			show: "Marketplace",
			tab: "/clients",
		},
		{
			show: "Past Orders",
			tab: "/clients/orders",
		},
		{
			show: "Business Profile",
			tab: "/business",
			userType: "business", 
		},
	];
	return (
		<>
			<Grid container sx={{ height: "100%", width: "100%" }}>
				{/*/Logo */}
				<Grid item xs={3}>
					<Box
						sx={{
							display: "flex",
							height: "100%",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Typography variant="company">sholo</Typography>
					</Box>
				</Grid>
				{/* Navitems */}
				<Grid
					container
					item
					xs={6}
					sx={{
						display: "flex",
						height: "100%",
						alignItems: "center",
					}}
				>
					{navItems.map((item) => {
						return (
							<Grid
								item
								xs={4}
								onClick={() => console.log("YES")}
								sx={{ cursor: "pointer" }}
							>
								{(!item.userType || (item?.userType === userData.type)) && (
									<Link to={item.tab} style={{ textDecoration: "none" }}>
										<Typography variant="desc">{item.show}</Typography>
									</Link>
								)}
							</Grid>
						);
					})}
				</Grid>
				{/* LogIn/User info */}
				<Grid
					container
					item
					xs={3}
					sx={{
						display: "flex",
						height: "100%",
						alignItems: "center",
					}}
				>
					{user ? (
						<>{/* //TODO implement if there is user */}</>
					) : (
						<>
							<Grid item xs={5}>
								<Button sx={{ ...styles.authButtons }}>LOGIN</Button>
							</Grid>
							<Grid item xs={5}>
								<Button sx={{ ...styles.authButtons }}>SIGNUP</Button>
							</Grid>
						</>
					)}
				</Grid>
			</Grid>
		</>
	);
};
export default ClientNavBar;
