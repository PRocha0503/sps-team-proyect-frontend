import { Box, Typography, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";

import styles from "./styles/style";

const ClientNavBar = () => {
	const user = null;
	const navItems = [
		{
			show: "Marketplace",
			tab: "/clients",
		},
		{
			show: "Past Orders",
			tab: "/clients/orders",
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
								xs={3}
								onClick={() => console.log("YES")}
								sx={{ cursor: "pointer" }}
							>
								<Link to={item.tab} style={{ textDecoration: "none" }}>
									<Typography variant="desc">{item.show}</Typography>
								</Link>
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
