import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { socialService } from '@/services/social.service';
import { ICreateReviewInput } from '@/types/social.types';
import { toast } from 'sonner';

export const useSocial = () => {
    const queryClient = useQueryClient();

    const useFeed = (limit?: number) => useQuery({
        queryKey: ['social', 'feed', limit],
        queryFn: () => socialService.getFeed(limit),
    });

    const useGameReviews = (gameId: string, page?: number, limit?: number) => useQuery({
        queryKey: ['social', 'game', gameId, page],
        queryFn: () => socialService.getGameReviews(gameId, page, limit),
        enabled: !!gameId,
    });

    const useUserReviews = (page?: number, limit?: number) => useQuery({
        queryKey: ['social', 'user-reviews', page],
        queryFn: () => socialService.getUserReviews(page, limit),
    });

    const createReviewMutation = useMutation({
        mutationFn: (data: ICreateReviewInput) => socialService.createReview(data),
        onSuccess: (_, variables) => {
            toast.success('Отзыв опубликован!');
            queryClient.invalidateQueries({ queryKey: ['social', 'feed'] });
            queryClient.invalidateQueries({ queryKey: ['social', 'game', variables.game_id] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || 'Не удалось отправить отзыв');
        }
    });

    return { useFeed, useGameReviews, useUserReviews, createReviewMutation };
};