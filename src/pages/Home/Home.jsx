import { Box, Grid, Typography } from "@mui/material";
import styles from "./styles/home";
import image from "../../assets/Phone.png";

import NavBar from "../../components/Navbar";

const Home = () => {
	return (
		<>
			<NavBar type={"user"} />
			<Box sx={{ ...styles.root }}>
				<Grid container spacing={3} sx={{ ...styles.intro }}>
					<Grid item xs={5}>
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								height: "100%",
							}}
						>
							<Box
								component="img"
								sx={{
									objectFit: "cover",
								}}
								src={image}
							/>
						</Box>
					</Grid>
					<Grid item xs={7}>
						<Box sx={{ height: "50%" }}>
							<Typography variant="h4" sx={{ color: "white", marginBottom: 1 }}>
								Shop local, support your community
							</Typography>
							<Typography variant="desc">
								Search for the products you are looking for in your community.
							</Typography>
						</Box>
						<Box sx={{ ...styles.secondSquare }}>
							<Typography variant="h4" sx={{ color: "white", marginBottom: 1 }}>
								Get people what they need
							</Typography>
							<Typography variant="desc" align="right">
								Search for the products you are looking for in your community.
							</Typography>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

export default Home;
