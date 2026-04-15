/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";

export const updateProfile = async (id: string, payload: any) => {
	try {
		console.log(id);

		const response = await api.put(`/user-ngo/${id}`, payload);
		return response.data;
	} catch (error) {
		console.error("unable to update", error);
	}
};

export const uploadImage = async (image: string) => {
	try {
		const response = await api.post("/upload", { image });
		return response.data;
	} catch (error) {
		console.error("unable to upload image", error);
	}
};

export const getAllUserByRole = async (role: string) => {
	try {
		const response: any = await api.get("/user-ngo/role", {
			params: { role: role },
		});
		return response.data;
	} catch (error) {
		console.error("Unable to get user");
	}
};

export const getAllUsers = async () => {
	try {
		const response: any = await api.get("/user-ngo");
		return response.data;
	} catch (error) {
		console.error("Unable to get user");
	}
};
