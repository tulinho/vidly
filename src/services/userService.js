import http from "./httpService";
import auth from "./authService";
import config from "../config.json";

const { apiEndpoint } = config;
const usersRoute = "/users";

const url = (id) => {
	const url = `${apiEndpoint}${usersRoute}`;
	if (!id) return url;
	return `${url}/${id}`;
};

export async function getUser(id) {
	const { data: user } = await http.get(url(id));
	return user;
}

export async function register(user) {
	const { data: newUser, headers } = await http.post(url(), user);
	auth.storeJwt(headers["x-auth-token"]);
	return newUser;
}
