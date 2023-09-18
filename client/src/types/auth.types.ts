export interface Auth {
    email: string,
    password: string
}

export interface AuthResponse {
    access_token: string,
    refresh_token: string,
    exp: number,
    sub: string, // user id
    message?: string | object
}

export interface SignupResponse {
    id: string,
    email: string,
    message?: string | object
}

export type User = Omit<AuthResponse, 'message'>;