import axios from "axios";

const isNewCustomer = async (token) => {
	await axios({
		method: "GET",
		url: `http://localhost:8080/api/customers`,
		headers: {
			"x-token": token,
		},
	});
	return;
};

export default isNewCustomer;
