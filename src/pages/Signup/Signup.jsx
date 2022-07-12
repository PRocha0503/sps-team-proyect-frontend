import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Box, Grid, Typography, Button, TextField } from "@mui/material";
import styles from "./styles/style";

import SingupImage from "../../assets/signup.svg";

const Signup = () => {
	const navigate = useNavigate();

	const [user, setUser] = useState("");
	const [password, setPassword] = useState("");
	const [userType, setUserType] = useState("customer");
	const [error, setError] = useState(false);

	const handleChange = (e, setter) => {
		setter(e.target.value);
	};
	const signup = async () => {
		console.log(user, password, userType);
		try {
			const { data } = await axios({
				method: "POST",
				url: `http://localhost:8080/api/auth/signup`,
				data: {
					username: user ? user : "",
					password: password ? password : "",
					type: userType ? userType : "customer",
				},
			});
			setError(false);
			localStorage.setItem("token", JSON.stringify({ token: data.token }));
			if (userType === "customer") {
				navigate("/clients");
			}
			if (userType === "business") {
				navigate("/business/user");
			}
		} catch (err) {
			console.log("ERROR", "Incorrect login credentials");
			setError("Incorrect login credentials");
		}
	};

	return (
		<>
			<Grid container sx={{ ...styles.root }}>
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
								Signup
							</Typography>
							<Typography
								variant="desc"
								textAlign="center"
								sx={{ color: "gray", marginBottom: 3 }}
							>
								Hello! Provide the your details below and join this amazing
								community!
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
						<TextField
							select
							sx={{ ...styles.select }}
							value={userType}
							onChange={(e) => handleChange(e, setUserType)}
							label="User type"
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
						</TextField>
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
						<Button onClick={signup}>SIGNUP</Button>
					</Box>
				</Grid>
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
							src={SingupImage}
						/>
					</Box>
				</Grid>
			</Grid>
		</>
	);
};

export default Signup;

//TODO use this in signup
