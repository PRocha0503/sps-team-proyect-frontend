import axios from "axios";

const validateJWT = async (token) => {
	const { data } = await axios({
		method: "GET",
		url: `${process.env.REACT_APP_API}/api/auth/validate`,
		headers: {
			"x-token": token,
		},
	});
	return data;
};

export default validateJWT;
