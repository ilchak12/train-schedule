import { User } from "../types/auth.types.ts";

class TokenService {
    getLocalRefreshToken(): string {
        const user: User = JSON.parse(localStorage.getItem("user")!);
        return user?.refresh_token;
    }

    getLocalAccessToken(): string {
        const user: User = JSON.parse(localStorage.getItem("user")!);
        return user?.access_token;
    }

    updateLocalAccessToken(token: string): void {
        let user: User = JSON.parse(localStorage.getItem("user")!);
        user.access_token = token;
        localStorage.setItem("user", JSON.stringify(user));
    }

    getUser(): User {
        return JSON.parse(localStorage.getItem("user")!);
    }

    setUser(user: any): void {
        localStorage.setItem("user", JSON.stringify(user));
    }

    removeUser(): void {
        localStorage.removeItem("user");
    }
}

export default new TokenService();