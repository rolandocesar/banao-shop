
export interface AuthResponse {
    ok: boolean;
    user?:  User;
    token?: string;
}

export interface User {
    name:  string;
    mobile: string;
    email: string;
    role?:  string;
    uid:   string;
}
