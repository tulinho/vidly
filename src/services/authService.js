import http from "./httpService";
import jwtDecode from "jwt-decode";
import config from "../config.json";

const { apiEndpoint } = config;
const authRoute = "/auth";
const url = `${apiEndpoint}${authRoute}`;
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
	const { data: token } = await http.post(url, { email, password });
	storeJwt(token);
}

export function storeJwt(token) {
	localStorage.setItem(tokenKey, token);
	http.setJwt(token);
}

export function getJwt() {
	return localStorage.getItem(tokenKey);
}

export function getCurrentUser() {
	try {
		const jwt = localStorage.getItem(tokenKey);
		return jwtDecode(jwt);
	} catch (error) {
		return;
	}
}

export function logout() {
	localStorage.removeItem(tokenKey);
	http.setJwt(null);
}

const auth = {
	login,
	getCurrentUser,
	storeJwt,
	logout,
};

export default auth;
