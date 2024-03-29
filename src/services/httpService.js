import axios from "axios";
import { toast } from "react-toastify";
import logger from "./loggingService";

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;

axios.interceptors.response.use(null, (error) => {
	const expectedError =
		error.response &&
		error.response.status >= 400 &&
		error.response.status < 500;
	if (!expectedError) {
		logger.error(error);
		toast.error("An unexpected error occurred.");
	}
	return Promise.reject(error);
});

function setJwt(jwt) {
	axios.defaults.headers.common["x-auth-token"] = jwt;
}

const Http = {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
	setJwt,
};

export default Http;
