import ClientNavBar from "./ClientNavBar";
import { Box } from "@mui/material";

import styles from "./styles/style";

const NavBar = ({ type }) => {
	return (
		<Box sx={{ ...styles.root }}>
			{type === "user" ? <ClientNavBar /> : <></>}
		</Box>
	);
};

export default NavBar;
