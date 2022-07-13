const styles = {
	root: {
		padding: "2rem",
		backgroundColor: "primary.main",
	},

	center: {
		height: "60vh",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
	},
	couponsContainer: {
		display: "flex",
		gap: 1,
		py: 1,
		overflow: "auto",
		scrollSnapType: "x mandatory",
		"& > *": {
			scrollSnapAlign: "center",
		},
		"::-webkit-scrollbar": { display: "none" },
	},
	modalButton: {
		width: "100%",
		backgroundColor: "primary.main",
		color: "white",
		marginTop: "2rem",
	},
	cat: {
		backgroundColor: "white",

		marginBottom: "2rem",
		marginRight: "1rem",
		":hover": {
			color: "black",
			backgroundColor: "white",
		},
	},
};

export default styles;
