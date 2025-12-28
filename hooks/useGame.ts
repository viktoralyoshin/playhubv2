import { useQuery } from "@tanstack/react-query";
import { gameService } from "@/services/game.service";

export const useTopGames = (limit: number = 10) => {
    return useQuery({
        queryKey: ["games", "top", limit],
        queryFn: () => gameService.getTopRated(limit),
        staleTime: 1000 * 60 * 5,
    });
};

export const useGameBySlug = (slug: string) => {
    return useQuery({
        queryKey: ["game", slug],
        queryFn: () => gameService.getBySlug(slug),
        enabled: !!slug,
        retry: 1,
    });
};

export const useGameById = (id: string) => useQuery({
    queryKey: ['game', id],
    queryFn: () => gameService.getGameById(id),
    enabled: !!id,
});

export const useUpcomingGames = (limit: number = 5) => {
    return useQuery({
        queryKey: ["games", "upcoming", limit],
        queryFn: () => gameService.getUpcoming(limit),
        staleTime: 1000 * 60 * 10,
    });
};