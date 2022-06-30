const typography = {
	fontFamily: ["Inter", "sans-serif"].join(","),
	h1: {
		color: "white",
		fontWeight: 500,
		fontSize: "clamp(2rem, 7vw + 0.5rem, 3.5rem)",
	},
	h2: {
		color: "white",
		fontWeight: 400,
		fontSize: "clamp(1.5rem, 3.5vw + 0.5rem, 2rem)",
	},
	h3: {
		fontWeight: 400,
		fontSize: "clamp(1rem, 2.5vw + 0.5rem, 1.5rem)",
	},
	h4: {
		fontWeight: 700,
		fontSize: "clamp(0.7rem, 1.5vw + 0.5rem, 1.3rem)",
	},
	desc: {
		fontFamily: ["Inter", "sans-serif"].join(","),
		color: "white",
		fontWeight: 500,
		fontSize: "clamp(0.5rem, 2vw + 0.5rem, 1rem)",
	},
	company: {
		fontFamily: ["Inter", "sans-serif"].join(","),
		color: "white",
		fontWeight: 900,
		fontSize: "clamp(0.5rem, 2vw + 1rem, 1.5rem)",
	},
};
export default typography;
