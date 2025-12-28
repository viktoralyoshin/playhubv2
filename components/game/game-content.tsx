"use client"

import React from "react"
import { IGame } from "@/types/game.types"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSocial } from "@/hooks/useSocial"
import { Loader2, MessageSquare } from "lucide-react"
import { ReviewCard } from "../social/review_card"

export function GameContent({ game }: { game: IGame }) {
    const { useGameReviews } = useSocial()
    const { data: reviews, isLoading: isReviewsLoading } = useGameReviews(game.id)

    return (
        <div className="space-y-12">
            <Tabs defaultValue="about" className="w-full">
                <TabsList className="bg-white/5 border border-white/10 p-1 mb-8">
                    <TabsTrigger value="about" className="data-[state=active]:bg-[#ff2e2e] data-[state=active]:text-white uppercase font-bold text-xs tracking-widest">
                        Об игре
                    </TabsTrigger>
                    <TabsTrigger value="reviews" className="data-[state=active]:bg-[#ff2e2e] data-[state=active]:text-white uppercase font-bold text-xs tracking-widest">
                        Отзывы {reviews?.length ? `(${reviews.length})` : ""}
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="about" className="space-y-12 mt-0 outline-none">
                    <section>
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
                            <span className="w-1 h-8 bg-[#ff2e2e]" /> Описание
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            {game.summary || "Описание данной игры пока отсутствует."}
                        </p>
                    </section>

                    {game.screenshots && game.screenshots.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
                                <span className="w-1 h-8 bg-[#ff2e2e]" /> Скриншоты
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {game.screenshots.map((src, index) => (
                                    <div key={index} className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group cursor-zoom-in">
                                        <Image
                                            src={src}
                                            alt={`${game.name} screenshot ${index}`}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </TabsContent>
                <TabsContent value="reviews" className="mt-0 outline-none">
                    <div className="space-y-6">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                                <span className="w-1 h-8 bg-[#ff2e2e]" /> Отзывы сообщества
                            </h2>
                        </div>

                        {isReviewsLoading ? (
                            <div className="flex justify-center py-20">
                                <Loader2 className="animate-spin text-[#ff2e2e] h-10 w-10" />
                            </div>
                        ) : reviews && reviews.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4">
                                {reviews.map((review) => (
                                    <ReviewCard key={review.id} review={review} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
                                <MessageSquare className="mx-auto h-12 w-12 text-gray-700 mb-4" />
                                <p className="text-gray-500 font-medium">К этой игре еще никто не оставил отзыв.</p>
                                <p className="text-gray-600 text-sm">Стань первым, поделись мнением!</p>
                            </div>
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}