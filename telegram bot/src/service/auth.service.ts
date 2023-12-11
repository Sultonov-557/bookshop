import axios from "axios";

export const AuthService = {
	async register(username: string, password: string, telegramID: string) {
		const res = await axios.post("http://localhost:80/auth/register", {
			username,
			password,
			telegramID,
		});

		return res.data.success;
	},
};
