"use client"

import React from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { motion } from "framer-motion"

interface GameCardProps {
    game: {
        id: number
        title: string
        image: string
        rating: number
        year: string
        genres: string[]
    }
}

export function GameCard({ game }: GameCardProps) {
    return (
        <motion.div
            layout // Магия Framer Motion: плавная перестройка сетки при удалении/добавлении элементов
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="group cursor-pointer"
        >
            {/* Контейнер картинки */}
            <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-lg mb-3">

                {/* Рейтинг в углу */}
                <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10">
                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-bold text-white">{game.rating}</span>
                </div>

                <Image
                    src={game.image}
                    alt={game.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Затемнение при наведении */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-[#ff2e2e] text-white text-xs font-bold px-4 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        Подробнее
                    </span>
                </div>
            </div>

            {/* Инфо */}
            <div>
                <h3 className="font-bold text-white leading-tight group-hover:text-[#ff2e2e] transition-colors truncate">
                    {game.title}
                </h3>
                <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                    <span>{game.year}</span>
                    <span className="truncate max-w-[100px] text-right">{game.genres[0]}</span>
                </div>
            </div>
        </motion.div>
    )
}