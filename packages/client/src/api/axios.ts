import axios, { AxiosRequestConfig } from "axios";

const axiosOptions: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_API_BASE_URL
};

const axiosInstance = axios.create({ ...axiosOptions });
export const axiosPrivateInstance = axios.create({ ...axiosOptions, withCredentials: true });

export default axiosInstance;
