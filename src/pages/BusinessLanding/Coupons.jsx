import {
	Container,
	Typography,
	Box,
	Card,
	CardHeader,
	Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import Page from "../../components/Page";
import Coupon from "../CliLandingPage/components/coupons";
import axios from "axios";
import styles from "./styles/Coupon";
import { useNavigate } from "react-router-dom";
import validateJWT from "../../helpers/validateJWT";
import isBusiness from "../../helpers/isBusiness";

export default function Coupons() {
	const [coupons, setCoupons] = useState([]);
	const navigate = useNavigate();

	const [user, setUser] = useState(0);
	const { token } = JSON.parse(localStorage.getItem("token")) || {};

	useEffect(() => {
		const validate = async () => {
			try {
				const user = await validateJWT(token);
				setUser(user);

				const isBs = await isBusiness(token);
				if (!isBs) {
					navigate("/business/user");
				}

				const getCoupons = async () => {
					const url = `${process.env.REACT_APP_API}/api/coupons/owner/?owner=${user.username}`;
					const req = await axios.get(url);
					setCoupons(req.data);
				};
				getCoupons();
			} catch (err) {
				console.log(err);
			}
		};
		validate();
	}, []);

	return (
		<Page title="Coupons">
			<Container>
				<Card sx={{ mb: 3, position: "relative" }}>
					<CardHeader
						title={"Your Coupons"}
						subheader={"View your coupons here."}
						action={
							<Button
								onClick={() => navigate("create")}
								sx={{ mt: 2, mb: 2, textAlign: "center" }}
								variant="contained"
								size="large"
								color="primary"
							>
								<Typography>Create Coupon</Typography>
							</Button>
						}
					/>
				</Card>
				<Box
					sx={{
						...styles.couponsContainer,
					}}
				>
					{Object.keys(coupons).map((key, index) => {
						return <Coupon item={coupons[key]} />;
					})}
				</Box>
			</Container>
		</Page>
	);
}
