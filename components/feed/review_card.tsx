"use client"

import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { formatDistanceToNow } from "date-fns"
import { ru } from "date-fns/locale"
import { useGameById } from "@/hooks/useGame"
import { useUserById } from "@/hooks/useUser"
import { IReview } from "@/types/social.types"
import { cn } from "@/lib/utils"

const getRatingStyle = (score: number) => {
    if (score >= 90) return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
    if (score >= 70) return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20"
    if (score >= 50) return "text-orange-500 bg-orange-500/10 border-orange-500/20"
    return "text-red-500 bg-red-500/10 border-red-500/20"
}

interface ReviewCardProps {
    review: IReview
    variants?: any
}

export function ReviewCard({ review, variants }: ReviewCardProps) {
    const { data: game, isLoading: gameLoading } = useGameById(review.game_id)
    const { data: user, isLoading: userLoading } = useUserById(review.user_id)

    return (
        <motion.div variants={variants} className="h-full">
            <div className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden flex flex-col hover:border-white/10 transition-all duration-300 group h-full relative">
                <div className="relative h-32 w-full overflow-hidden bg-black">
                    {game?.cover_url ? (
                        <img
                            src={game.cover_url}
                            alt={game.name}
                            className="absolute inset-0 w-full h-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-110"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent" />
                    <div className="absolute top-4 right-4 z-20">
                        <div className={cn(
                            "flex items-center justify-center min-w-[48px] h-12 px-3 rounded-xl border backdrop-blur-md font-black text-xl shadow-2xl",
                            getRatingStyle(review.rating)
                        )}>
                            {review.rating}
                        </div>
                    </div>
                </div>
                <div className="p-6 pt-0 flex-grow flex flex-col relative z-10 -mt-6">
                    <div className="flex items-end gap-3 mb-5">
                        <Avatar className="w-12 h-12 border-2 border-[#121212] shadow-xl">
                            <AvatarImage src={`https://api.dicebear.com/7.x/identicon/svg?seed=${user?.username || review.user_id}`} />
                            <AvatarFallback className="bg-zinc-800 text-zinc-400">U</AvatarFallback>
                        </Avatar>
                        <div className="mb-1 flex-1 min-w-0">
                            <h4 className="text-white font-bold leading-none truncate text-sm flex items-center gap-2">
                                {gameLoading ? (
                                    <Loader2 className="w-3 h-3 animate-spin text-zinc-500" />
                                ) : (
                                    game?.name || "Игра"
                                )}
                            </h4>
                            <p className="text-[11px] text-zinc-500 truncate mt-1.5 font-medium tracking-wide">
                                {userLoading ? (
                                    "загрузка..."
                                ) : (
                                    `@${user?.username || "user_" + review.user_id.substring(0, 4)}`
                                )}
                            </p>
                        </div>
                    </div>
                    <div className="mb-6 relative">
                        <Quote className="absolute -top-1 -left-1 w-4 h-4 text-zinc-800 rotate-180" />
                        <p className="text-zinc-300 text-sm leading-relaxed pl-5 italic line-clamp-4">
                            {review.text || "Без описания..."}
                        </p>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                        <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                            {formatDistanceToNow(new Date(review.created_at), {
                                addSuffix: true,
                                locale: ru
                            })}
                        </span>
                        <div className="flex items-center gap-1.5">
                            <div className="w-1 h-1 rounded-full bg-[#ff2e2e]" />
                            <span className="text-[9px] text-zinc-500 font-black uppercase tracking-tighter">PH Feed</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}