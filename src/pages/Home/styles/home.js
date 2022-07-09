const styles = {
	root: {
		padding: "2rem",
		backgroundColor: "primary.main",
	},
	intro: {
		display: "flex",
		flexDirection: "column",
		height: "95vh",
		paddingTop: "6rem",
	},
	firstSquare: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		height: "80%",
	},
	secondSquare: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-end",
	},
	title: {
		color: "white",
		marginBottom: 2,
		fontSize: "clamp(0.7rem, 1.5vw + 0.8rem, 1.8rem)",
	},
	desc: {
		marginBottom: 2,
		fontSize: "clamp(0.7rem, 1.5vw + 0.4rem, 1.4rem)",
	},
	button: {
		backgroundColor: "white",
		color: "primary.main",
		padding: 1,
		"&:hover": {
			color: "black",
			backgroundColor: "white",
		},
	},
};

export default styles;
