import axios, { AxiosError } from "axios";

// const BASEURL = "http://localhost:8080/api";
const LIVEBASEURL = "https://foodshare-be-new.vercel.app/api";
// Create axios instance
const api = axios.create({
	baseURL: LIVEBASEURL, // ⚙️ change to your API base URL
	timeout: 10000, // optional
	headers: {
		"Content-Type": "application/json",
	},
});

// ✅ Request interceptor — attach token
api.interceptors.request.use(
	(config: any) => {
		const token = localStorage.getItem("access_token"); // or AsyncStorage if React Native
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error: any) => {
		return Promise.reject(error);
	}
);

// ✅ Response interceptor — handle errors globally
api.interceptors.response.use(
	(response: any) => response,
	(error: AxiosError) => {
		if (error.response) {
			const { status, data }: any = error.response;

			switch (status) {
				case 400:
					console.error(
						"Bad Request:",
						data?.message || error.message
					);
					break;
				case 401:
					console.error(
						"Unauthorized: Token may be invalid or expired"
					);
					// Optionally logout user:
					// localStorage.removeItem("access_token");
					// window.location.href = "/auth/login"; // optional redirect
					break;
				case 403:
					console.error("Forbidden: Access denied");
					break;
				case 404:
					console.error(
						"Not Found:",
						data?.message || "Endpoint not found"
					);
					break;
				case 500:
					console.error(
						"Server Error:",
						data?.message || "Internal server error"
					);
					break;
				default:
					console.error(
						`Error ${status}:`,
						data?.message || error.message
					);
			}
		} else if (error.request) {
			console.error("No response received from server");
		} else {
			console.error("Axios Error:", error.message);
		}

		return Promise.reject(error);
	}
);

export default api;
