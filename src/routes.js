import Home from "./pages/Home/Home.jsx";
import BusinessLanding from "./pages/BusinessLanding/BusinessLanding.jsx";
import ClientsLandingPage from "./pages/CliLandingPage/CliLandingPage.jsx";
import BusinessLandingLayout from "./layouts/BusinessLanding/BusinessLandingLayout.js";

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

	{
		id: 2,
		path: '/business/',
		element: <BusinessLandingLayout />,
		children: [
		  { id: 3, path: '/', element: <BusinessLanding /> },
		],
	  },
];

export default routes;
