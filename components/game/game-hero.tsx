"use client"

import React from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Calendar, Globe } from "lucide-react"
import { motion } from "framer-motion"

interface GameHeroProps {
    game: {
        title: string
        background: string
        cover: string
        genres: string[]
        releaseDate: string
        dev: string
    }
}

export function GameHero({ game }: GameHeroProps) {
    return (
        <div className="relative h-[60vh] w-full overflow-hidden">
            <Image
                src={game.background}
                alt="Background"
                fill
                className="object-cover opacity-60"
                priority
            />
            {/* Градиент */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />

            <div className="absolute bottom-0 w-full pb-10">
                <div className="container mx-auto px-4 flex items-end gap-8">

                    {/* Обложка (Box Art) */}
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hidden lg:block relative w-52 h-72 rounded-xl overflow-hidden shadow-2xl border-2 border-white/10 flex-shrink-0 -mb-24 z-10"
                    >
                        <Image src={game.cover} alt="Cover" fill className="object-cover" />
                    </motion.div>

                    {/* Информация */}
                    <motion.div
                        className="mb-4 w-full"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex gap-2 mb-4">
                            {game.genres.map((g) => (
                                <Badge key={g} variant="secondary" className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border-0">
                                    {g}
                                </Badge>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-4 shadow-black drop-shadow-lg">
                            {game.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-gray-300 font-medium text-sm md:text-base">
                            <span className="flex items-center gap-2">
                                <Calendar size={18} className="text-[#ff2e2e]" /> {game.releaseDate}
                            </span>
                            <span className="flex items-center gap-2">
                                <Globe size={18} className="text-[#ff2e2e]" /> {game.dev}
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}