import axios from "axios";

const isBusiness = async (token) => {
	try {
		const url = `${process.env.REACT_APP_API}/api/auth/isBusiness`;
		await axios({
			method: "GET",
			url: url,
			headers: {
				"x-token": token,
			},
		});
		return true;
	} catch (err) {
		return false;
	}
};

export default isBusiness;
