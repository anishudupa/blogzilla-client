import axios from "axios";

const API = axios.create({
	baseURL: import.meta.env.VITE_API_URI,
	headers: {
		"Content-Type": "application/json",
	},
});

API.interceptors.request.use(function (config) {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default API;