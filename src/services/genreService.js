import http from "./httpService";

const apiEndpoint = "/genres";

const getUrl = (id) => {
	const url = apiEndpoint;
	if (!id) return url;
	return `${url}/${id}`;
};

export async function getGenres() {
	const { data: genres } = await http.get(getUrl());
	return genres;
}
