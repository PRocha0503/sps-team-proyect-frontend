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
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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
					setOpen(true);
					//navigate("/business/user");
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

	const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

		navigate("/business/user");
    setOpen(false);
  };

	return (
		<Page title="Coupons">
			<Container>
			<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Incomplete registration📖"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            To add coupons you must complete the registration process.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
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
