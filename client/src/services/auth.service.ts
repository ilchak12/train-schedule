import axios from "axios";
import { Auth, AuthResponse, SignupResponse } from "../types/auth.types.ts";
import TokenService from "./token.service.ts";
import { API } from "./api.ts";

const API_URL: string = `${API}v1/auth/`;

class AuthService {
    async login({email, password}: Auth): Promise<AuthResponse> {
        const response = await axios
            .post(API_URL + "sign-in", {
                username: email,
                password,
            });

        const res: AuthResponse = response.data;

        if (res.access_token) {
            TokenService.setUser(res);
        }

        return res;
    };

    register({ email, password }: Auth): Promise<SignupResponse> {
        return axios.post(API_URL + "sign-up", {
            username: email,
            password,
        });
    };

    logout(): void {
        TokenService.removeUser();
    }
}

export default new AuthService();