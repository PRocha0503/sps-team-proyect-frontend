import React, { useEffect } from "react";
import axios from "axios";
import { Typography } from "@mui/material";

const BusinessRecomendations = () => {
	// const [userLocation, setUserLocation] = React.useState({});

	// useEffect(() => {
	//   console.log(userLocation);
	// 	const getBusinessRecomendations = async () => {
	// 		try {
	// 			const nearestBusiness = await axios.get(`${process.env.REACT_APP_API}/api/business/nearest`, {
	//         params: userLocation
	// 			});
	//       console.log(nearestBusiness);
	// 		}
	// 		catch (err) {
	// 			console.log(err);
	// 		}
	// 	};
	// 	getBusinessRecomendations();
	// }, [userLocation]);

	// useEffect(() => {
	//   if (navigator.geolocation) {
	//     navigator.geolocation.getCurrentPosition(
	//       async (position) => {
	//         const pos = {
	//           lat: position.coords.latitude,
	//           lng: position.coords.longitude,
	//         };
	//         console.log(pos);
	//         setUserLocation(pos);
	//       },
	//       (error) => {
	//         console.log(error);
	//       }
	//     );
	//   }
	// }, []);

	return (
		// <div>
		//   <h1>BusinessRecomendations</h1>
		// </div>
		<Typography variant="h2" sx={{ color: "black" }}>
			You have register yous business successfully
		</Typography>
	);
};

export default BusinessRecomendations;
