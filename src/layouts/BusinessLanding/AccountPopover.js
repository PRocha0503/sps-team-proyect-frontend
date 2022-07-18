import { useRef, useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { alpha } from "@mui/material/styles";
import {
	Box,
	Divider,
	Typography,
	Stack,
	MenuItem,
	Avatar,
	IconButton,
} from "@mui/material";
import MenuPopover from "../../components/MenuPopover";
import validateJWT from "../../helpers/validateJWT";

const MENU_OPTIONS = [
	{
		label: "Home",
		icon: "eva:home-fill",
		linkTo: "/",
	},
	{
		label: "Profile",
		icon: "eva:person-fill",
		linkTo: "/business/products",
	},
];

export default function AccountPopover() {
	const anchorRef = useRef(null);
	const navigate = useNavigate();
	const [open, setOpen] = useState(null);
	const [user, setUser] = useState(0);
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

	const handleOpen = (event) => {
		setOpen(event.currentTarget);
	};

	const handleClose = () => {
		setOpen(null);
	};
	const logOut = () => {
		localStorage.removeItem("token");
		navigate("/");
	};

	return (
		<>
			<IconButton
				ref={anchorRef}
				onClick={handleOpen}
				sx={{
					p: 0,
					...(open && {
						"&:before": {
							zIndex: 1,
							content: "''",
							width: "100%",
							height: "100%",
							borderRadius: "50%",
							position: "absolute",
							bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
						},
					}),
				}}
			>
				<Avatar alt="photoURL" />
			</IconButton>

			<MenuPopover
				open={Boolean(open)}
				anchorEl={open}
				onClose={handleClose}
				sx={{
					p: 0,
					mt: 1.5,
					ml: 0.75,
					"& .MuiMenuItem-root": {
						typography: "body2",
						borderRadius: 0.75,
					},
				}}
			>
				<Box sx={{ my: 1.5, px: 2.5 }}>
					<Typography variant="subtitle2" noWrap>
						{user.username}
					</Typography>
				</Box>

				<Divider sx={{ borderStyle: "dashed" }} />

				<Stack sx={{ p: 1 }}>
					{MENU_OPTIONS.map((option) => (
						<MenuItem
							key={option.label}
							to={option.linkTo}
							component={RouterLink}
							onClick={handleClose}
						>
							{option.label}
						</MenuItem>
					))}
				</Stack>

				<Divider sx={{ borderStyle: "dashed" }} />

				<MenuItem onClick={logOut} sx={{ m: 1 }}>
					Logout
				</MenuItem>
			</MenuPopover>
		</>
	);
}
