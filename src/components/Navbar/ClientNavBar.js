import { useState } from "react";

import {
	Box,
	Typography,
	Grid,
	Button,
	Avatar,
	Link as LinkMUI,
	Menu,
	MenuItem,
	ListItemText,
	ListItemIcon,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { Link } from "react-router-dom";
import axios from 'axios';

import styles from "./styles/style";
import { useEffect, useState } from "react";

const ClientNavBar = ({ user }) => {
	const [menu, setMenu] = useState(null);
	const handleClick = (setState) => (event) => {
		setState(event.currentTarget);
	};
	const handleClose = (setState) => () => {
		setState(null);
	};
	const logout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
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
						<Link to="/">
							<Typography variant="company">sholo</Typography>
						</Link>
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
					{user ? (
						navItems.map((item) => {
							return (
								<Grid
									item
									xs={4}
									onClick={() => console.log("YES")}
									sx={{ cursor: "pointer" }}
								>
									<Link to={item.tab} style={{ textDecoration: "none" }}>
										<Typography variant="desc">{item.show}</Typography>
									</Link>
								</Grid>
							);
						})
					) : (
						<></>
					)}
				</Grid>
				<Grid
					container
					item
					xs={3}
					sx={{
						display: "flex",
						height: "100%",
						alignItems: "center",
						justifyContent: "flex-end",
					}}
				>
					{user ? (
						<Grid item xs={5}>
							<LinkMUI onClick={handleClick(setMenu)}>
								<Avatar sx={{ bgcolor: "white", color: "black" }}>
									{user && user.username[0]}
								</Avatar>
							</LinkMUI>
							<Menu
								anchorEl={menu}
								keepMounted
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "left",
								}}
								transformOrigin={{
									vertical: "top",
									horizontal: "center",
								}}
								open={Boolean(menu)}
								onClose={handleClose(setMenu)}
								PaperProps={{
									elevation: 0,
									sx: {
										overflow: "visible",
										filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
										mt: 1.5,
										borderRadius: 6,

										"&:before": {
											content: '""',
											display: "block",
											position: "absolute",
											top: 0,
											right: "48%",
											width: 10,
											height: 10,
											bgcolor: "background.paper",
											transform: "translateY(-50%) rotate(45deg)",
											zIndex: 0,
										},
									},
								}}
							>
								<LinkMUI href="/profile">
									<MenuItem>
										<ListItemIcon sx={{ color: "black" }}>
											<PersonIcon fontSize="small" />
										</ListItemIcon>
										<ListItemText sx={{ color: "black" }}>Profile</ListItemText>
									</MenuItem>
								</LinkMUI>
								<LinkMUI onClick={logout}>
									<MenuItem>
										<ListItemIcon sx={{ color: "black" }}>
											<ExitToAppIcon fontSize="small" />
										</ListItemIcon>
										<ListItemText sx={{ color: "black" }}>Logout</ListItemText>
									</MenuItem>
								</LinkMUI>
							</Menu>
						</Grid>
					) : (
						<>
							<Grid item xs={5}>
								<Link to="/login">
									<Button sx={{ ...styles.authButtons }}>LOGIN</Button>
								</Link>
							</Grid>
							<Grid item xs={5}>
								<Link to="signup">
									<Button sx={{ ...styles.authButtons }}>SIGNUP</Button>
								</Link>
							</Grid>
						</>
					)}
				</Grid>
			</Grid>
		</>
	);
};
export default ClientNavBar;
