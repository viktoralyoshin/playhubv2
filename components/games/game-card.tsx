import React from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Star, Gamepad2 } from "lucide-react"
import { motion } from "framer-motion"
import { IGame } from "@/types/game.types"
import Link from "next/link"

interface GameCardProps {
    game: IGame
}

export function GameCard({ game }: GameCardProps) {
    const hasCover = game.cover_url && game.cover_url.trim() !== ""

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="group cursor-pointer"
        >
            <Link href={`/games/${game.slug}`}>
                <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-white/10 bg-[#1a1a1a] shadow-lg mb-3">
                    <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10">
                        <Star size={12} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-xs font-bold text-white">
                            {game.playhub_rating ? game.playhub_rating : "—"}
                        </span>
                    </div>

                    {hasCover ? (
                        <Image
                            src={game.cover_url}
                            alt={game.name}
                            fill
                            loading="lazy"
                            sizes="(max-width: 768px) 50vw, 20vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] text-gray-600 group-hover:text-[#ff2e2e] transition-colors">
                            <Gamepad2 size={48} strokeWidth={1} className="mb-2 opacity-20 group-hover:opacity-100 transition-opacity" />
                            <span className="text-[10px] uppercase tracking-widest font-bold opacity-40">No Cover</span>
                        </div>
                    )}

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="bg-[#ff2e2e] text-white text-xs font-bold px-4 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            Подробнее
                        </span>
                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-white leading-tight group-hover:text-[#ff2e2e] transition-colors truncate">
                        {game.name}
                    </h3>
                    <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                        <span>{game.first_release_date ? game.first_release_date.split('-')[0] : "TBA"}</span>
                        <span className="truncate max-w-[100px] text-right">
                            {game.genres && game.genres.length > 0 ? game.genres[0] : "Game"}
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}