import http from "./httpService";
import auth from "./authService";

const apiEndpoint = "/users";

const url = (id) => {
	const url = apiEndpoint;
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
