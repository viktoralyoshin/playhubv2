"use client"

import React from "react"
import { IGame } from "@/types/game.types"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ReviewDialog } from "@/components/social/review-dialog"
import { useUpdateLibraryStatus } from "@/hooks/useLibrary"
import { GameStatus } from "@/types/library.types"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Loader2, ChevronDown, Check, Clock, PlayCircle, Trophy, Trash2, Bell } from "lucide-react"

export function GameSidebar({ game }: { game: IGame }) {
    const { mutate: updateStatus, isPending } = useUpdateLibraryStatus()

    const details = [
        { label: "Платформы", value: game.platforms },
        { label: "Жанры", value: game.genres },
        { label: "Темы", value: game.themes },
    ]

    const isReleased = () => {
        if (!game.first_release_date || game.first_release_date === "N/A") return false
        const releaseDate = new Date(game.first_release_date)
        return !isNaN(releaseDate.getTime()) && releaseDate <= new Date()
    }

    const canReview = isReleased()

    const statuses = [
        { id: GameStatus.PLAYING, label: "Играю", icon: <PlayCircle size={16} />, color: "text-green-500" },
        { id: GameStatus.PLAN, label: "В планах", icon: <Clock size={16} />, color: "text-blue-500" },
        { id: GameStatus.COMPLETED, label: "Пройдено", icon: <Trophy size={16} />, color: "text-purple-500" },
        { id: GameStatus.DROPPED, label: "Брошено", icon: <Trash2 size={16} />, color: "text-zinc-500" },
    ]

    const handleStatusChange = (status: GameStatus) => {
        updateStatus({ gameId: game.id.toString(), status })
    }

    return (
        <aside className="space-y-8 bg-[#121212] p-6 rounded-2xl border border-white/5 sticky top-28">
            <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white/5 rounded-xl border border-white/5">
                    <div className="text-xs text-gray-500 uppercase font-bold mb-1">IGDB</div>
                    <div className="text-2xl font-black text-white">
                        {game.igdb_rating ? Math.round(game.igdb_rating) : "—"}
                    </div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl border border-white/5">
                    <div className="text-xs text-gray-500 uppercase font-bold mb-1">PlayHub</div>
                    <div className="text-2xl font-black text-[#ff2e2e]">
                        {game.playhub_rating ? game.playhub_rating : "—"}
                    </div>
                </div>
            </div>

            <Separator className="bg-white/10" />
            <div className="space-y-6">
                {details.map((item) => (
                    item.value && item.value.length > 0 && (
                        <div key={item.label}>
                            <h4 className="text-xs uppercase tracking-widest text-gray-500 font-black mb-3">
                                {item.label}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {item.value.map(val => (
                                    <Badge key={val} variant="outline" className="border-white/10 text-white hover:border-[#ff2e2e] transition-colors">
                                        {val}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )
                ))}
            </div>

            <Separator className="bg-white/10" />
            <div className="space-y-3">
                {isReleased() ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                disabled={isPending}
                                className="w-full py-3 bg-white text-black font-black uppercase text-sm rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                            >
                                {isPending ? <Loader2 className="animate-spin" size={18} /> : "В библиотеку"}
                                <ChevronDown size={16} />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] bg-[#1a1a1a] border-white/10 text-white p-2 rounded-xl">
                            {statuses.map((s) => (
                                <DropdownMenuItem
                                    key={s.id}
                                    onClick={() => handleStatusChange(s.id)}
                                    className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-white/5 focus:bg-white/5 transition-colors"
                                >
                                    <span className={s.color}>{s.icon}</span>
                                    <span className="font-bold text-xs uppercase tracking-wider">{s.label}</span>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <button
                        disabled={isPending}
                        onClick={() => handleStatusChange(GameStatus.WAITING)}
                        className="w-full py-3 bg-white text-black font-black uppercase text-sm rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                    >
                        {isPending ? (
                            <Loader2 className="animate-spin" size={18} />
                        ) : (
                            <>
                                <Bell size={18} />
                                Жду игру
                            </>
                        )}
                    </button>
                )}
                {canReview ? (
                    <ReviewDialog game={game}>
                        <button className="w-full py-3 bg-[#ff2e2e] text-white font-black uppercase text-sm rounded-xl hover:bg-[#d61e1e] transition-colors shadow-[0_0_20px_rgba(255,46,46,0.3)]">
                            Оценить игру
                        </button>
                    </ReviewDialog>
                ) : (
                    <div className="w-full py-3 bg-white/5 text-gray-500 font-black uppercase text-[10px] text-center rounded-xl border border-white/5 cursor-default">
                        Оценка будет доступна после релиза
                    </div>
                )}
            </div>
        </aside>
    )
}