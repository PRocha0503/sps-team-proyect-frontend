import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/index";
import Router from "./routes";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Router/>
		</ThemeProvider>
	);
}

export default App;
