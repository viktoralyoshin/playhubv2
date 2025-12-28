import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { gameService } from "@/services/game.service"
import { GameOrderBy } from "@/types/game.types"

export const useGamesCatalog = (page: number, limit: number, query: string, order: GameOrderBy) => {
    return useQuery({
        queryKey: ["games-catalog", page, limit, query, order],
        queryFn: () => {
            if (query) {
                return gameService.search(query, limit)
            }

            return gameService.getAll({ page, limit, order })
        },
        placeholderData: keepPreviousData,
    })
}