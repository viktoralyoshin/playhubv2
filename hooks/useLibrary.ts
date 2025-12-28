import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { libraryService } from "@/services/library.service";
import { GameStatus } from "@/types/library.types";
import { toast } from "sonner"; // или любая твоя либа для уведомлений

export const useUserLibrary = (page: number = 1, limit: number = 10) => {
    return useQuery({
        queryKey: ["user-library", page, limit],
        queryFn: () => libraryService.getUserLibrary(page, limit),
    });
};

export const useLibraryStats = () => {
    return useQuery({
        queryKey: ["library-stats"],
        queryFn: () => libraryService.getStats(),
    });
};

export const useUpdateLibraryStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ gameId, status }: { gameId: string; status: GameStatus }) =>
            libraryService.updateStatus(gameId, status),

        onSuccess: () => {
            // Инвалидируем списки и статы, чтобы данные обновились везде
            queryClient.invalidateQueries({ queryKey: ["user-library"] });
            queryClient.invalidateQueries({ queryKey: ["library-stats"] });
            toast.success("Статус игры обновлен");
        },
        onError: (error) => {
            toast.error("не удалось обновить статус");
            console.error(error);
        }
    });
};