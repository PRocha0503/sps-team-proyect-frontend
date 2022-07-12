import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography, Button } from "@mui/material";

import NavBar from "../../components/Navbar";
import validateJWT from "././../../helpers/validateJWT";
import styles from "./styles/home";
import image from "../../assets/Phone.png";

const Home = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState();
	const { token } = JSON.parse(localStorage.getItem("token")) || {};

	useEffect(() => {
		const validate = async () => {
			try {
				const user = await validateJWT(token);
				setUser(user);
			} catch (err) {
				console.log(err);
			}
		};
		validate();
	}, []);
	const goToLogin = () => {
		navigate("/signup");
	};

	return (
		<>
			<NavBar type={"customer"} user={user} />
			<Box sx={{ ...styles.root }}>
				<Grid container spacing={3} sx={{ ...styles.intro }}>
					<Grid item xs={6}>
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
						<Box sx={{ ...styles.firstSquare }}>
							<Typography variant="h4" sx={{ ...styles.title }}>
								Shop local, support your community
							</Typography>
							<Typography variant="desc" sx={{ ...styles.desc }}>
								Search for the products you are looking for in your community.
							</Typography>
							<Button onClick={goToLogin} sx={{ ...styles.button }}>
								Join as customer
							</Button>
						</Box>
						<Box sx={{ ...styles.secondSquare }}>
							<Typography variant="h4" sx={{ ...styles.title }}>
								Get people what they need
							</Typography>
							<Typography variant="desc" align="right" sx={{ ...styles.desc }}>
								Get more people to know your small brand and know all about your
								amazing products.
							</Typography>
							<Button onClick={goToLogin} sx={{ ...styles.button }}>
								Join as business
							</Button>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

export default Home;
