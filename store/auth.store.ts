import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { IAuthResponse } from '@/types/user.types';

interface AuthState {
    user: IAuthResponse | null;
    isAuth: boolean;
    setUser: (user: IAuthResponse | null) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuth: false,
            setUser: (user) => set({ user, isAuth: !!user }),
            logout: () => set({ user: null, isAuth: false }),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);