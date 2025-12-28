"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { useSocial } from "@/hooks/useSocial"
import { useAuthStore } from "@/store/auth.store"
import { toast } from "sonner"
import { IGame } from "@/types/game.types"

interface ReviewDialogProps {
    game: IGame
    children: React.ReactNode
}

export function ReviewDialog({ game, children }: ReviewDialogProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [rating, setRating] = useState([80])
    const [text, setText] = useState("")

    const { isAuth } = useAuthStore()
    const { createReviewMutation } = useSocial()

    const handleSubmit = () => {
        if (!isAuth) {
            toast.error("Сначала нужно войти в аккаунт")
            return
        }

        if (text.length < 10) {
            toast.error("Напиши хотя бы пару предложений (минимум 10 символов)")
            return
        }

        createReviewMutation.mutate({
            game_id: game.id,
            rating: rating[0],
            text: text
        }, {
            onSuccess: () => {
                setIsOpen(false)
                setText("")
                setRating([80])
            }
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="bg-[#121212] border-white/10 text-white max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black uppercase">Оценить {game.name}</DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-bold text-gray-400 uppercase">Твоя оценка</label>
                            <span className={cn(
                                "text-2xl font-black px-3 py-1 rounded-lg border",
                                rating[0] >= 90 ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/10" :
                                    rating[0] >= 70 ? "text-yellow-500 border-yellow-500/20 bg-yellow-500/10" :
                                        "text-red-500 border-red-500/20 bg-red-500/10"
                            )}>
                                {rating[0]}
                            </span>
                        </div>
                        <Slider
                            value={rating}
                            onValueChange={setRating}
                            max={100}
                            step={1}
                            className="py-4"
                        />
                    </div>
                    <div className="space-y-2 max-w-full">
                        <label className="text-sm font-bold text-gray-400 uppercase">Твои впечатления</label>
                        <Textarea
                            placeholder="Расскажи, как тебе игра..."
                            className={cn(
                                "bg-white/5 border-white/10 focus:border-[#ff2e2e] transition-colors",
                                "min-h-[120px] resize-none w-full",
                                "break-words overflow-wrap-anywhere"
                            )}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>

                    <Button
                        onClick={handleSubmit}
                        disabled={createReviewMutation.isPending}
                        className="w-full bg-[#ff2e2e] hover:bg-[#d61e1e] text-white font-black uppercase py-6 shadow-[0_0_20px_rgba(255,46,46,0.3)]"
                    >
                        {createReviewMutation.isPending ? "Публикация..." : "Опубликовать отзыв"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ")
}