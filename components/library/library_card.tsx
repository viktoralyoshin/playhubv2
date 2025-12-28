import React from "react"
import Link from "next/link"
import { useGameById } from "@/hooks/useGame"
import { GameStatus, ILibraryEntry } from "@/types/library.types"
import { Badge } from "@/components/ui/badge"
import { Gamepad2, Loader2 } from "lucide-react"
import { format } from "date-fns"

interface LibraryGameCardProps {
    entry: ILibraryEntry
    statusDetails: { label: string; color: string }
}

export function LibraryGameCard({ entry, statusDetails }: LibraryGameCardProps) {
    const { data: game, isLoading } = useGameById(entry.game_id)

    if (isLoading) {
        return (
            <div className="bg-[#121212] border border-white/5 rounded-xl aspect-[3/4] flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-zinc-700" />
            </div>
        )
    }

    if (!game) return null

    return (
        <Link
            href={`/games/${game.slug}`}
            className="group relative bg-[#121212] border border-white/5 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all flex flex-col"
        >
            <div className="aspect-[3/4] relative overflow-hidden">
                <img
                    src={game.cover_url}
                    alt={game.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="absolute top-2 right-2">
                    <Badge className={`${statusDetails.color} border font-bold text-[10px] backdrop-blur-md`}>
                        {statusDetails.label}
                    </Badge>
                </div>
            </div>

            <div className="p-3">
                <h4 className="font-bold text-sm text-white line-clamp-1 group-hover:text-purple-400 transition-colors">
                    {game.name}
                </h4>
                <p className="text-[10px] text-zinc-500 mt-1 uppercase">
                    {format(new Date(entry.created_at), 'dd.MM.yyyy')}
                </p>
            </div>
        </Link>
    )
}