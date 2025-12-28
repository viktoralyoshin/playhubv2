import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import { ISignIn, ISignUp } from '@/types/user.types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/auth.store';

export const useAuthMutations = () => {
    const { push } = useRouter();
    const queryClient = useQueryClient();
    const setUser = useAuthStore((state) => state.setUser);
    const logoutStore = useAuthStore((state) => state.logout);

    const loginMutation = useMutation({
        mutationFn: (data: ISignIn) => authService.signIn(data),
        onSuccess: (user) => {
            setUser(user);
            toast.success('Успешный вход!');
            push('/');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || 'Ошибка при входе');
        }
    });

    const registerMutation = useMutation({
        mutationFn: (data: ISignUp) => authService.signUp(data),
        onSuccess: (user) => {
            setUser(user);
            toast.success('Аккаунт создан!');
            push('/');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || 'Ошибка при регистрации');
        }
    });

    const logoutMutation = useMutation({
        mutationFn: () => authService.logout(),
        onSuccess: () => {
            logoutStore();
            queryClient.clear();
            toast.success('Вышли из системы');
            push('/auth');
        }
    });

    return { loginMutation, registerMutation, logoutMutation };
};