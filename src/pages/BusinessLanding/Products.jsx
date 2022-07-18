import { Container, Typography, Card, CardHeader, Button } from "@mui/material";
import { useEffect, useState } from "react";
import Page from "../../components/Page";
import { ProductTable } from "../../components/Product/index";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import validateJWT from "../../helpers/validateJWT";
import isBusiness from "../../helpers/isBusiness";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Products() {
	const [products, setProducts] = useState([]);
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
					// navigate("/business/user");
				}

				const getProducts = async () => {
					const url = `${process.env.REACT_APP_API}/api/products/business/?owner_name=${user.username}`;
					const req = await axios.get(url);
					setProducts(req.data);
				};
				getProducts();
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
		<Page title="Products">
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
							To add products you must complete the registration process.
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
						title={"Your Products"}
						subheader={"View your products here."}
						action={
							<Button
								onClick={() => navigate("create")}
								sx={{ mt: 2, mb: 2, textAlign: "center" }}
								variant="contained"
								size="large"
								color="primary"
							>
								<Typography>Create Product</Typography>
							</Button>
						}
					/>
				</Card>
				<ProductTable products={products} />
			</Container>
		</Page>
	);
}
