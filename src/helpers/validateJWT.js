import axios from "axios";

const validateJWT = async (token) => {
	const { data } = await axios({
		method: "GET",
		url: `http://localhost:8080/api/auth/validate`,
		headers: {
			"x-token": token,
		},
	});
	return data;
};

export default validateJWT;
