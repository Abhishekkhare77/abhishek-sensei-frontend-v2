import axiosInstance from "./api";

export const signup = async (data) => {
    const response = await axiosInstance.post('/register', data);
    return response.data;
  };