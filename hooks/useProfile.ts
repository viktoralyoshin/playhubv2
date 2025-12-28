import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useProfile = () => {
    const { isAuth, setUser, logout } = useAuthStore();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['profile'],
        queryFn: () => authService.getProfile(),
        enabled: isAuth,
        retry: 1
    });

    useEffect(() => {
        if (data) setUser(data as any);
        if (isError) logout();
    }, [data, isError, setUser, logout]);

    return { data, isLoading, error, isError };
};