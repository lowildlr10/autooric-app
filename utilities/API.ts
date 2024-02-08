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
			return error.response
		})
		.then((response) => {
			return response
		})
	}

	// Logout user
	static async logout(accessToken: string) {
		return axios.post(`${API.API_BASE_URL}/api/v1/logout`, null, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
		.catch((error) => {
			return error.response
		})
		.then((response) => {
			return response
		})
	}

	// Fetch all categories
	static async getCategories(accessToken: string) {
		return axios.get(`${API.API_BASE_URL}/api/v1/categories`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
	}

	// Fetch all payors
	static async getPayors(accessToken: string) {
		return axios.get(`${API.API_BASE_URL}/api/v1/payors`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
	}

	// Fetch all particulars
	static async getParticulars(accessToken: string) {
		return axios.get(`${API.API_BASE_URL}/api/v1/particulars`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
	}

	// Fetch all official receipts
	static async getOfficialReceipts(accessToken: string) {
		return axios.get(`${API.API_BASE_URL}/api/v1/official-receipts`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
	}

	// Fetch all discounts
	static async getDiscounts(accessToken: string) {
		return axios.get(`${API.API_BASE_URL}/api/v1/discounts`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
	}

	// Fetch all paper sizes
	static async getPaperSizes(accessToken: string) {
		return axios.get(`${API.API_BASE_URL}/api/v1/paper-sizes`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
	}

	// Fetch printable OR
	static async getPrintableOR(accessToken: string, orId: string, paperSizeId: string) {
		return axios.get(
			`${API.API_BASE_URL}/api/v1/print/official-receipt?or_id=${orId}&paper_size_id=${paperSizeId}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Access-Control-Allow-Origin': '*',
			},
		})
	}

	// Create official receipt
	static async createOfficialReceipt(accessToken: string, formData: any) {
		return axios.post(`${API.API_BASE_URL}/api/v1/official-receipts`, formData, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
	}

	// create particulars
	static async createParticulars(accessToken: string, formData: any) {
		return axios.post(`${API.API_BASE_URL}/api/v1/particulars`, formData, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
	}

	// Create discounts
	static async createDiscount(accessToken: string, formData: any) {
		return axios.post(`${API.API_BASE_URL}/api/v1/discounts`, formData, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
	}
}