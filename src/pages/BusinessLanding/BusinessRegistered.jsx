/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import { Wrapper } from "@googlemaps/react-wrapper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Input } from "@mui/material";
import BusinessDetails from "./BusinessDetails";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { width } from "@mui/system";

const Map = ({ onClick, onIdle, children, style, ...options }) => {
	const ref = React.useRef(null);
	const [map, setMap] = React.useState();

	React.useEffect(() => {
		if (ref.current && !map) {
			setMap(
				new window.google.maps.Map(ref.current, {
					mapTypeControl: false,
					streetViewControl: false,
					fullscreenControl: false,
				})
			);
		}
	}, [ref, map]);

	useDeepCompareEffectForMaps(() => {
		if (map) {
			map.setOptions(options);
		}
	}, [map, options]);

	React.useEffect(() => {
		if (map) {
			["click", "idle"].forEach((eventName) =>
				google.maps.event.clearListeners(map, eventName)
			);
			if (onClick) {
				map.addListener("click", onClick);
			}

			if (onIdle) {
				map.addListener("idle", () => onIdle(map));
			}
		}
	}, [map, onClick, onIdle]);

	return (
		<>
			<div ref={ref} style={style} />
			{React.Children.map(children, (child) => {
				if (React.isValidElement(child)) {
					return React.cloneElement(child, { map });
				}
			})}
		</>
	);
};

const Circle = (options) => {
	const [circle, setCircle] = React.useState();

	React.useEffect(() => {
		if (!circle) {
			setCircle(
				new google.maps.Circle({
					strokeColor: "#FF0000",
					strokeOpacity: 0.8,
					strokeWeight: 2,
					fillColor: "#FF0000",
					fillOpacity: 0.35,
				})
			);
		}

		return () => {
			if (circle) {
				circle.setMap(null);
			}
		};
	}, [circle]);
	React.useEffect(() => {
		if (circle) {
			circle.setOptions(options);
		}
	}, [circle, options]);
	return null;
};

const Marker = (options) => {
	const [marker, setMarker] = React.useState();

	React.useEffect(() => {
		if (!marker) {
			setMarker(new google.maps.Marker());
		}

		return () => {
			if (marker) {
				marker.setMap(null);
			}
		};
	}, [marker]);
	React.useEffect(() => {
		if (marker) {
			marker.setOptions(options);
		}
	}, [marker, options]);
	return null;
};

const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a, b) => {
	if (
		isLatLngLiteral(a) ||
		a instanceof google.maps.LatLng ||
		isLatLngLiteral(b) ||
		b instanceof google.maps.LatLng
	) {
		return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
	}
	return deepEqual(a, b);
});

function useDeepCompareMemoize(value) {
	const ref = React.useRef();

	if (!deepCompareEqualsForMaps(value, ref.current)) {
		ref.current = value;
	}
	return ref.current;
}

function useDeepCompareEffectForMaps(callback, dependencies) {
	React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

const BusinessRegistered = () => {
	const render = (status) => {
		return <h1>{status}</h1>;
	};

	const API_KEY = process.env.REACT_APP_MAPS_API_KEY;
	const [businessInfo, setBusinessInfo] = useState({});
	const userToken = localStorage.getItem("token");
	const token = JSON.parse(userToken)["token"];
	const [user, setUser] = useState({});

	useEffect(() => {
		const getUser = async () => {
			try {
				const userType = await axios.get(
					`${process.env.REACT_APP_API}/api/auth/validate`,
					{
						headers: {
							"x-token": token,
						},
					}
				);
				setUser(userType.data);
			} catch (err) {
				console.log(err);
			}
		};
		getUser();
	}, [token]);

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API}/api/business/${user.username}`)
			.then((res) => {
				setBusinessInfo(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [user]);

	const daysInSpanish = {
		Mon: "Lunes",
		Tue: "Martes",
		Wed: "Miércoles",
		Thu: "Jueves",
		Fri: "Viernes",
		Sat: "Sábado",
		Sun: "Domingo",
	};

	return (
		<>
			<Typography variant="h2" sx={{ color: "black" }}>
				Has registrado tu negocio exitosamente ✨
			</Typography>

			{Object.keys(businessInfo).length > 0 && (
				<>
					<div style={{ display: "flex", height: "40%", width: "100%" }}>
						<Wrapper apiKey={API_KEY} render={render}>
							<Map
								center={{
									lat: businessInfo.location.lat,
									lng: businessInfo.location.lng,
								}}
								zoom={10}
								style={{ flexGrow: "1", height: "100%" }}
							>
								<Marker
									position={{
										lat: businessInfo.location.lat,
										lng: businessInfo.location.lng,
									}}
								/>
								<Circle
									center={{
										lat: businessInfo.location.lat,
										lng: businessInfo.location.lng,
									}}
									radius={businessInfo.serviceArea}
								/>
							</Map>
						</Wrapper>
					</div>

					<Card sx={{ minWidth: 250 }}>
						<CardContent>
							<Typography
								sx={{ fontSize: 14 }}
								color="text.secondary"
								gutterBottom
							>
								Business Location
							</Typography>
							<Typography variant="h5" component="div">
								{businessInfo.location.address}
							</Typography>
							<Typography
								sx={{ fontSize: 14 }}
								color="text.secondary"
								gutterBottom
							>
								Service Area: {businessInfo.serviceArea} (mts)
							</Typography>
						</CardContent>
					</Card>

					<Typography>
						<h3>Tus horarios son:</h3>
					</Typography>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 700 }} aria-label="spanning table">
							<TableHead>
								<TableRow>
									<TableCell align="center" colSpan={3}>
										Horario
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Dia</TableCell>
									<TableCell align="right">Incio</TableCell>
									<TableCell align="right">Fin</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{Object.entries(businessInfo.serviceHours).map((day, entry) => (
									<TableRow key={day[0]}>
										<TableCell>{daysInSpanish[day[0]]}</TableCell>
										<TableCell align="right">{day[1].start}</TableCell>
										<TableCell align="right">{day[1].end}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</>
			)}
		</>
	);
};

export default BusinessRegistered;
