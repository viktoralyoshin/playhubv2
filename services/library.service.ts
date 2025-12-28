import { axiosWithAuth } from "@/api/interceptors";
import { GameStatus, ILibraryEntry, ILibraryStats } from "@/types/library.types";

export const libraryService = {
    async getUserLibrary(page: number = 1, limit: number = 10) {
        const response = await axiosWithAuth.get<ILibraryEntry[]>("/library/user", {
            params: { page, limit }
        });
        return response.data;
    },

    async getStats() {
        const response = await axiosWithAuth.get<ILibraryStats>("/library/stats");
        return response.data;
    },

    async updateStatus(gameId: string, status: GameStatus) {
        const response = await axiosWithAuth.post<ILibraryEntry>(
            `/library/new/${gameId}`,
            {},
            { params: { status } }
        );
        return response.data;
    }
};