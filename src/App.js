import * as React from "react";
import { Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/index";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Typography variant="h1">Sample</Typography>
		</ThemeProvider>
	);
}

export default App;
