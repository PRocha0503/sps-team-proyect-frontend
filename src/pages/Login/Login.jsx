import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Box, Grid, Typography, Button, TextField } from "@mui/material";
import styles from "./styles/style";
import validateJWT from "../../helpers/validateJWT";
import NavBar from "../../components/Navbar";

import Support from "../../assets/support.svg";

const Login = () => {
	const navigate = useNavigate();

	const [user, setUser] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);

	const handleChange = (e, setter) => {
		setter(e.target.value);
	};
	const login = async () => {
		try {
			const { data } = await axios({
				method: "POST",
				url: `${process.env.REACT_APP_API}/api/auth/login`,
				data: {
					username: user ? user : "empty",
					password: password ? password : "empty",
				},
			});
			setError(false);
			localStorage.setItem("token", JSON.stringify({ token: data.token }));
			const loggedUser = await validateJWT(data.token);
			console.log(loggedUser);
			if (loggedUser.type === "customer") {
				navigate("/clients");
			}
			if (loggedUser.type === "business") {
				navigate("/business/user");
			}
		} catch (err) {
			console.log("ERROR", "Incorrect login credentials");
			setError("Incorrect login credentials");
		}
	};

	return (
		<>
			<NavBar type={"customer"} />
			<Grid container sx={{ ...styles.root }}>
				<Grid item xs={6} sx={{ ...styles.left }}>
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
								width: "100%",
								maxWidth: "500px",
								objectFit: "cover",
							}}
							src={Support}
						/>
					</Box>
				</Grid>
				<Grid item xs={6}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							height: "100%",
						}}
					>
						{" "}
						<Box
							sx={{
								width: "80%",
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Typography
								variant="h1"
								sx={{ color: "black", fontWeight: "bold" }}
							>
								Login
							</Typography>
							<Typography
								variant="desc"
								textAlign="center"
								sx={{ color: "gray", marginBottom: 3 }}
							>
								Welcome back! Please login to your account. If you don't have an
								account yet, sing up here.
							</Typography>
							<TextField
								label="Email"
								value={user}
								onChange={(e) => handleChange(e, setUser)}
								variant="outlined"
								sx={{ ...styles.input }}
							/>
							<TextField
								label="Password"
								type="password"
								value={password}
								onChange={(e) => handleChange(e, setPassword)}
								variant="outlined"
								sx={{ ...styles.input }}
							/>
						</Box>
						{error ? (
							<Typography
								variant="desc"
								sx={{ color: "red", paddingBottom: 3 }}
							>
								{error}
							</Typography>
						) : (
							<></>
						)}
						<Button onClick={login}>LOGIN</Button>
					</Box>
				</Grid>
			</Grid>
		</>
	);
};

export default Login;

//TODO use this in signup
{
	/* <TextField
								select
								sx={{ ...styles.select }}
								value={userType}
								onChange={(e) => handleChange(e, setUserType)}
								label="User type"
								// value={currency}
								//   onChange={handleChange}
								SelectProps={{
									native: true,
								}}
								helperText="Please select if you would like to join as a customer or business"
							>
								<option key={"customer"} value={"customer"}>
									Customer
								</option>
								<option key={"business"} value={"business"}>
									Business
								</option>
							</TextField> */
}
