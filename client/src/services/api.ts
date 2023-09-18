import axios, { AxiosInstance } from "axios";
import TokenService from "./token.service.ts";

export const API = import.meta.env.VITE_SERVER_API || 'http://localhost:5173/';

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: API,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(request => {
    const token: string = TokenService.getLocalAccessToken();

    if (token) {
        request.headers['Authorization'] = `Bearer ${token}`
    }

    return request;
}, error => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        console.log(originalConfig);

        if (originalConfig.url !== "/auth/sign-in" && err.response) {
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    const rs = await axios.get(API + "v1/auth/token", {
                        headers: {
                            "Authorization": `Bearer ${TokenService.getLocalRefreshToken()}`
                        }
                    });

                    TokenService.setUser(rs.data)

                    return axios(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }

        return Promise.reject(err);
    }
);