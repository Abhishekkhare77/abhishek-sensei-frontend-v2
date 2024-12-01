import axiosInstance from "./api";

export const login = async (data) => {
    const response = await axiosInstance.post('/login', data);
    return response.data;
  };