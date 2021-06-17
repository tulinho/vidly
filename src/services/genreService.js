import http from "./httpService";
import config from "../config.json";

const { apiEndpoint } = config;
const genreRoute = "/genres";

const getUrl = (id) => {
	const url = `${apiEndpoint}${genreRoute}`;
	if (!id) return url;
	return url + `/${id}`;
};

export async function getGenres() {
	const { data: genres } = await http.get(getUrl());
	return genres;
}
