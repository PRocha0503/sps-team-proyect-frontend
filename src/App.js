import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import theme from "./theme/index";
import routes from "./routes";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Routes>
					{routes.map((route) => (
						<Route
							key={route.id}
							path={route.path}
							exact={route.exact}
							element={route.element}
						/>
					))}
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App;
