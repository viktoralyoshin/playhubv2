import { axiosClassic } from "@/api/interceptors";
import { GameOrderBy, IGame, IGameFilters } from "@/types/game.types";

export const gameService = {
    async getAll({ page, limit, order }: { page: number, limit: number, order: GameOrderBy }) {
        const { data } = await axiosClassic.get<IGame[]>('/games', {
            params: { page, limit, order }
        })
        return data
    },

    async search(query: string, limit: number = 10) {
        const response = await axiosClassic.get<IGame[]>("/games/search", {
            params: {
                q: query,
                limit: limit
            }
        });
        return response.data;
    },

    async getTopRated(limit: number = 10) {
        const response = await axiosClassic.get<IGame[]>("/games/top", {
            params: { limit }
        });
        return response.data;
    },

    async getUpcoming(limit: number = 5) {
        const response = await axiosClassic.get<IGame[]>("/games/upcoming", {
            params: { limit }
        });
        return response.data;
    },

    async getBySlug(slug: string) {
        const response = await axiosClassic.get<IGame>(`/games/game/${slug}`);
        return response.data;
    },

    async getGameById(id: string) {
        const response = await axiosClassic.get<IGame>(`/games/game/id/${id}`);
        return response.data;
    },

    async getByGenre(genreSlug: string, limit: number = 10) {
        const response = await axiosClassic.get<IGame[]>(`/games/genre/${genreSlug}`, {
            params: { limit }
        });
        return response.data;
    },

    async setRating(gameId: string, rating: number) {
        const response = await axiosClassic.post(`/games/rating`, {
            game_id: gameId,
            rating: rating
        });
        return response.data;
    }
};