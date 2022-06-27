import Home from "./pages/Home/Home.jsx";
import ClientsLandingPage from "./pages/CliLandingPage/CliLandingPage.jsx";

const routes = [
	{
		id: 0,
		path: "/",
		element: <Home />,
		exact: true,
	},
	{
		id: 1,
		path: "/clients",
		element: <ClientsLandingPage />,
		exact: true,
	},
];

export default routes;
