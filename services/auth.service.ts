import { axiosClassic, axiosWithAuth } from "@/api/interceptors";
import { removeFromStorage, saveTokenStorage } from "./auth-token.service";
import { IAuthResponse, IAuthToken, ISignIn, ISignUp, IUser } from "@/types/user.types";

export const authService = {
    async signIn(data: ISignIn) {
        const response = await axiosClassic.post<IAuthResponse>(`/auth/signin`, data);
        if (response.data.access_token) saveTokenStorage(response.data.access_token);
        return response.data;
    },

    async signUp(data: ISignUp) {
        const response = await axiosClassic.post<IAuthResponse>(`/auth/signup`, data);
        if (response.data.access_token) saveTokenStorage(response.data.access_token);
        return response.data;
    },

    async getNewTokens() {
        const response = await axiosClassic.get<IAuthToken>("/auth/new-tokens");
        if (response.data.access_token) saveTokenStorage(response.data.access_token);
        return response;
    },

    async logout() {
        const response = await axiosClassic.get("/auth/logout");
        if (response.status === 200) removeFromStorage();
        return response;
    },

    async getProfile() {
        const response = await axiosWithAuth.get<IUser>("/auth");
        return response.data;
    },

    async getUserById(id: string) {
        const response = await axiosClassic.get<IUser>(`/auth/user/${id}`);
        return response.data;
    }
};