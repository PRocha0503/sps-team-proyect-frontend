import ClientNavBar from "./ClientNavBar";
import { Box } from "@mui/material";

import styles from "./styles/style";

const NavBar = ({ type, user }) => {
	return (
		<Box sx={{ ...styles.root }}>
			{type === "customer" ? <ClientNavBar user={user} /> : <></>}
		</Box>
	);
};

export default NavBar;
