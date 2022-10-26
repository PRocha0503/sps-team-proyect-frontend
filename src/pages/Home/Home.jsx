import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography, Button } from "@mui/material";

import NavBar from "../../components/Navbar";
import validateJWT from "././../../helpers/validateJWT";
import styles from "./styles/home";
import image from "../../assets/com.png";

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
								Compra local, ayuda a la comunidad
							</Typography>
							<Typography variant="desc" sx={{ ...styles.desc }}>
								Encuentra los productos que tu quieres en tu area y ayuda a la
								empresas chicas.
							</Typography>
							<Button onClick={goToLogin} sx={{ ...styles.button }}>
								Empieza a comprar
							</Button>
						</Box>
						<Box sx={{ ...styles.secondSquare }}>
							<Typography variant="h4" sx={{ ...styles.title }}>
								Dale a conocer con la gente que te quiere
							</Typography>
							<Typography variant="desc" align="right" sx={{ ...styles.desc }}>
								Concoce y ofece tus increibles productos a la comunidad en la
								que vives.
							</Typography>
							<Button onClick={goToLogin} sx={{ ...styles.button }}>
								Unete como negocio
							</Button>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

export default Home;
