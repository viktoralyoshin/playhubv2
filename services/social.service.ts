import { axiosClassic, axiosWithAuth } from "@/api/interceptors";
import { IReview, ICreateReviewInput } from "@/types/social.types";

export const socialService = {
    async createReview(data: ICreateReviewInput) {
        const response = await axiosWithAuth.post<IReview>("/social", data);
        return response.data;
    },

    async getFeed(limit: number = 10) {
        const response = await axiosClassic.get<IReview[]>("/social/feed", {
            params: { limit }
        });
        return response.data;
    },

    async getUserReviews(page: number = 1, limit: number = 10) {
        const response = await axiosWithAuth.get<IReview[]>("/social/user", {
            params: { page, limit }
        });
        return response.data;
    },

    async getGameReviews(gameId: string, page: number = 1, limit: number = 10) {
        const response = await axiosClassic.get<IReview[]>(`/social/game/${gameId}`, {
            params: { page, limit }
        });
        return response.data;
    }
};