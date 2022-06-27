import Home from "./pages/Home/Home.jsx";
import BusinessLanding from "./pages/BusinessLanding/BusinessLanding.jsx";

const routes = [
	{
		id: 0,
		path: "/",
		element: <Home />,
		exact: true,
	},

	{
		id: 2,
		path: "/business",
		element: <BusinessLanding/>,
		exact: true,
	},
];

export default routes;
