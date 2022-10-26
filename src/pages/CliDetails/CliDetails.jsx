import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Box, Typography, TextField, Button } from "@mui/material";
import styles from "./styles/style";
import validateJWT from "../../helpers/validateJWT";
import NavBar from "../../components/Navbar";

const CliDetails = () => {
	const [user, setUser] = useState(null);
	const [gender, setGender] = useState("male");
	const [age, setAge] = useState(0);
	const navigate = useNavigate();
	const { token } = JSON.parse(localStorage.getItem("token")) || {};

	useEffect(() => {
		const validate = async () => {
			try {
				const user = await validateJWT(token);
				setUser(user);
			} catch (err) {
				console.log(err);
				navigate("/login");
			}
		};

		validate();
	}, []);
	const handleChange = (e, setter) => {
		setter(e.target.value);
	};
	const submit = async () => {
		if (!gender || !age) return;
		try {
			await axios({
				method: "POST",
				url: `${process.env.REACT_APP_API}/api/customers`,
				headers: {
					"x-token": token,
				},
				data: {
					gender,
					age,
				},
			});
			navigate("/clients");
		} catch (err) {
			console.log;
		}
	};
	return (
		<>
			<NavBar type={"customer"} user={user ? user : null} />
			<Box sx={{ ...styles.root }}>
				<Box sx={{ ...styles.form }}>
					<Typography variant="h2" sx={{ color: "black" }}>
						User info
					</Typography>
					<TextField
						select
						sx={{ ...styles.select }}
						value={gender}
						onChange={(e) => handleChange(e, setGender)}
						label="Genero"
						SelectProps={{
							native: true,
						}}
						helperText="¿Cómo te identificas?"
					>
						<option key={"male"} value={"male"}>
							Hombre
						</option>
						<option key={"female"} value={"female"}>
							Mujer
						</option>
						<option key={"other"} value={"other"}>
							Otro
						</option>
					</TextField>
					<TextField
						label="Edad"
						type="number"
						value={age}
						onChange={(e) => handleChange(e, setAge)}
						variant="outlined"
						sx={{ ...styles.input }}
					/>
					<Button onClick={submit} sx={{ ...styles.button }}>
						Mandar
					</Button>
				</Box>
			</Box>
		</>
	);
};

export default CliDetails;
