import { useRoutes } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import BusinessLanding from "./pages/BusinessLanding/BusinessLanding.jsx";
import ClientsLandingPage from "./pages/CliLandingPage/CliLandingPage.jsx";
import ClientsPastOrders from "./pages/CliPastOrders/CliPastOrders.jsx";
import BusinessLandingLayout from "./layouts/BusinessLanding/BusinessLandingLayout.js";
import Products from "./pages/BusinessLanding/Products.jsx";
import BusinessHome from "./pages/BusinessLanding/BusinessHome.jsx";
import Coupons from "./pages/BusinessLanding/Coupons.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import CreateProducts from "./pages/BusinessLanding/Create/CreateProducts.jsx";
import CreateCoupons from "./pages/BusinessLanding/Create/CreateCoupons.jsx";

export default function Router() {
	return useRoutes([
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
			path: "/business",
			element: <BusinessLandingLayout />,
			children: [
				{ path: "user", element: <BusinessHome /> },
				{ path: "app", element: <BusinessLanding /> },
				{ path: "products", element: <Products /> },
				{ path: "coupons", element: <Coupons /> },
				{ path: "products/create", element: <CreateProducts /> },
				{ path: "coupons/create", element: <CreateCoupons /> }, 
			],
		},
		{
			id: 3,
			path: "/clients/orders",
			element: <ClientsPastOrders />,
			exact: true,
		},
		{
			id: 4,
			path: "/login",
			element: <Login />,
			exact: true,
		},
		{
			id: 4,
			path: "/signup",
			element: <Signup />,
			exact: true,
		},
	]);
}
