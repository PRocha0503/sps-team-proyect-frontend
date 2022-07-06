const styles = {
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
	}
};

export default styles;