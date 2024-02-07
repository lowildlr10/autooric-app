import axios from "axios"

export default class API {
	private static readonly API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

	// Fetch current user
	static async getCurrentUser(accessToken: string) {
		return axios.get(`${API.API_BASE_URL}/api/v1/me`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
	}

	// Login user
	static async login(username: string, password: string) {
		return axios.post(`${API.API_BASE_URL}/api/v1/login`, {
			username,
			password,
		})
		.catch((error) => {
			return error.response?.data
		})
		.then((response) => {
			return response?.data
		})
	}
}