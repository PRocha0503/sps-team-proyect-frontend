import axios from "axios";

const isNewCustomer = async (token) => {
	await axios({
		method: "GET",
		url: `${process.env.REACT_APP_API}/api/customers`,
		headers: {
			"x-token": token,
		},
	});
	return;
};

export default isNewCustomer;
