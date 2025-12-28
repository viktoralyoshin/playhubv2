"use client"

import React from "react"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileStats } from "@/components/profile/profile-stats"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useProfile } from "@/hooks/useProfile"
import { useSocial } from "@/hooks/useSocial"
import { Loader2, MessageSquare, AlertCircle, Library } from "lucide-react"
import { ReviewCard } from "@/components/social/review_card"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { useLibraryStats, useUserLibrary } from "@/hooks/useLibrary"
import { GameStatus } from "@/types/library.types"
import { LibraryGameCard } from "@/components/library/library_card"

const getStatusDetails = (status: GameStatus) => {
    switch (status) {
        case GameStatus.PLAYING: return { label: "Играю", color: "bg-green-500/20 text-green-500 border-green-500/20" }
        case GameStatus.COMPLETED: return { label: "Пройдено", color: "bg-purple-500/20 text-purple-500 border-purple-500/20" }
        case GameStatus.PLAN: return { label: "В планах", color: "bg-blue-500/20 text-blue-500 border-blue-500/20" }
        case GameStatus.DROPPED: return { label: "Брошено", color: "bg-zinc-500/20 text-zinc-500 border-zinc-500/20" }
        case GameStatus.WAITING: return { label: "Жду", color: "bg-yellow-500/20 text-yellow-500 border-yellow-500/20" }
        default: return { label: "Неизвестно", color: "bg-zinc-500/20 text-zinc-500" }
    }
}

export default function UserProfilePage() {
    const { data: user, isLoading: isProfileLoading, error } = useProfile()
    const { useUserReviews } = useSocial()
    const { data: reviews, isLoading: isReviewsLoading } = useUserReviews(1, 10)
    const { data: library, isLoading: isLibraryLoading } = useUserLibrary(1, 20)
    const { data: libraryStats } = useLibraryStats()

    if (isProfileLoading) return (
        <div className="h-screen flex items-center justify-center bg-[#050505]">
            <Loader2 className="w-12 h-12 animate-spin text-[#ff2e2e]" />
        </div>
    )

    if (error || !user) return (
        <div className="h-screen flex flex-col items-center justify-center bg-[#050505] text-white">
            <AlertCircle className="w-16 h-16 text-zinc-800 mb-4" />
            <h2 className="text-xl font-black uppercase">Доступ запрещен</h2>
            <p className="text-zinc-500">Войдите в систему, чтобы увидеть профиль</p>
        </div>
    )

    const formattedDate = format(new Date(user.created_at), 'MMMM yyyy', { locale: ru })

    return (
        <div className="bg-[#050505] min-h-screen text-white pb-20">
            <ProfileHeader user={{
                ...user,
                joined: formattedDate,
                avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${user.id}`,
            }} />

            <div className="container mx-auto px-4">
                <ProfileStats
                    reviewsCount={reviews?.length || 0}
                    libraryCount={libraryStats?.stats || 0}
                />

                <Tabs defaultValue="reviews" className="w-full">
                    <TabsList className="bg-[#121212] border border-white/5 h-12 p-1 rounded-xl mb-8">
                        <TabsTrigger value="reviews" className="px-8 rounded-lg data-[state=active]:bg-[#ff2e2e] uppercase font-black text-[10px] tracking-widest">
                            Отзывы {reviews?.length ? `(${reviews.length})` : ""}
                        </TabsTrigger>
                        <TabsTrigger value="library" className="px-8 rounded-lg data-[state=active]:bg-purple-600 uppercase font-black text-[10px] tracking-widest">
                            Библиотека {libraryStats?.stats ? `(${libraryStats.stats})` : ""}
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="reviews" className="outline-none">
                        {isReviewsLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-50"><Loader2 className="animate-spin text-[#ff2e2e]" /></div>
                        ) : reviews && reviews.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {reviews.map((review) => <ReviewCard key={review.id} review={review} />)}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-zinc-900/20 rounded-3xl border border-dashed border-white/10">
                                <MessageSquare className="w-10 h-10 text-zinc-800 mx-auto mb-4" />
                                <p className="text-zinc-500 font-bold uppercase text-xs tracking-widest">Отзывов пока нет</p>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="library" className="outline-none">
                        {isLibraryLoading ? (
                            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-purple-500" /></div>
                        ) : library && library.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {library.map((item) => (
                                    <LibraryGameCard
                                        key={item.game_id}
                                        entry={item}
                                        statusDetails={getStatusDetails(item.status)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-zinc-900/20 rounded-3xl border border-dashed border-white/10">
                                <Library className="w-10 h-10 text-zinc-800 mx-auto mb-4" />
                                <p className="text-zinc-500 font-bold uppercase text-xs tracking-widest">Библиотека пуста</p>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}