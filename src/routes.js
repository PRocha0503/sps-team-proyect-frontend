import { useRoutes } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import BusinessLanding from "./pages/BusinessLanding/BusinessLanding.jsx";
import ClientsLandingPage from "./pages/CliLandingPage/CliLandingPage.jsx";
import BusinessLandingLayout from "./layouts/BusinessLanding/BusinessLandingLayout.js";
import Products from "./pages/BusinessLanding/Products.jsx";

export default function Router() {
	return useRoutes([
		{
			id: 0,
			path: "/",
			element: <Home />,
			exact: true
		},

		{
			id: 2,
			path: "/clients",
			elements: <ClientsLandingPage />,
			exact: true
		},

	  	{
			id: 3,
			path: '/business',
			element: <BusinessLandingLayout />,
			children: [
				{ path: 'app', element: <BusinessLanding /> },
				{ path: 'products', element: <Products /> },
			],
		},

	]);
  }