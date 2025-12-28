export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
}

export interface IUser {
    id: string;
    username: string;
    email: string;
    role: UserRole;
    created_at: string;
    updated_at: string;
}

export interface IAuthResponse extends IUser {
    access_token: string;
}

export interface IAuthToken {
    access_token: string;
}

export interface ISignIn {
    login: string;
    password: string;
}

export interface ISignUp {
    email: string;
    username: string;
    password: string;
}