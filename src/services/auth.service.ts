import api from "./api";

export const sendOtp = async (email: any) => {
  try {
    const response = await api.post("/auth/send-otp", { email });
    return response.data;
  } catch (error) {
    console.error("Unable to register", error);
  }
};

export const verifyOtp = async (email: any, otp: any) => {
  try {
    const response = await api.post("/auth/verify-otp", { email, otp });
    return response.data;
  } catch (error) {
    console.error("Unable to register", error);
  }
};

export const registerUser = async (payload: any) => {
  try {
    const response = await api.post("/auth/register", payload);
    return response.data;
  } catch (error) {
    console.error("Unable to register", error);
  }
};

export const login = async (payload: any) => {
  try {
    const response = await api.post("/auth/login", payload);
    return response.data;
  } catch (error) {
    console.error("Unable to register", error);
  }
};

export const resetPassword = async (payload: any) => {
  try {
    const response = await api.post("/auth/reset-password", payload);
    return response.data;
  } catch (error) {
    console.error("Unable to register", error);
  }
};
