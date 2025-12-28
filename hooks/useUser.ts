import { useQuery } from "@tanstack/react-query"
import { authService } from "@/services/auth.service"

export const useUserById = (userId: string) => {
    return useQuery({
        queryKey: ["user", userId],
        queryFn: () => authService.getUserById(userId),
        enabled: !!userId,
        staleTime: 1000 * 60 * 5,
    })
}