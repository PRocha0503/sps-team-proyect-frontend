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
};

export default styles;
