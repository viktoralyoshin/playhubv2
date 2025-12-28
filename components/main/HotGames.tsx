"use client"

import React from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { motion } from "framer-motion"
import Image from "next/image"
import { Loader2 } from "lucide-react"
import { useTopGames } from "@/hooks/useGame"

export function HotGames() {
    const { data: games, isLoading } = useTopGames(10)

    if (isLoading) {
        return (
            <div className="h-[400px] flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-[#ff2e2e]" />
            </div>
        )
    }

    return (
        <section className="py-10">
            <div className="container mx-auto px-4">
                <motion.div
                    className="flex items-center justify-between mb-8"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl font-bold text-white">Игры с лучшими оценками</h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <Carousel
                        opts={{ align: "start", loop: true }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4">
                            {games?.map((game) => (
                                <CarouselItem key={game.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                    <Link href={`/games/${game.slug}`} className="block group cursor-pointer select-none">
                                        <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-lg mb-4">
                                            {game.playhub_rating > 80 && (
                                                <Badge className="absolute top-4 right-4 z-10 bg-[#ff2e2e] hover:bg-[#d61e1e] text-white border-0 px-3 py-1 text-xs font-bold shadow-md">
                                                    {game.playhub_rating}
                                                </Badge>
                                            )}
                                            <Image
                                                src={game.cover_url}
                                                alt={game.name}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>
                                        <div className="pl-1">
                                            <h3 className="text-xl font-bold text-white group-hover:text-[#ff2e2e] transition-colors truncate">
                                                {game.name}
                                            </h3>
                                            <p className="text-sm text-gray-400 mt-1 font-medium">
                                                {game.first_release_date?.split('-')[0]} • {game.genres?.[0] || 'Game'}
                                            </p>
                                        </div>
                                    </Link>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="hidden md:block">
                            <CarouselPrevious className="left-[-20px] bg-black/50 border-white/20 text-white hover:bg-[#ff2e2e] hover:border-[#ff2e2e] hover:text-white transition-colors h-12 w-12" />
                            <CarouselNext className="right-[-20px] bg-black/50 border-white/20 text-white hover:bg-[#ff2e2e] hover:border-[#ff2e2e] hover:text-white transition-colors h-12 w-12" />
                        </div>
                    </Carousel>
                </motion.div>
            </div>
        </section>
    )
}