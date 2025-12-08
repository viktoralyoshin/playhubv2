"use client"

import React from "react"
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

const games = [
    {
        id: 1,
        title: "Grand Theft Auto V",
        year: "2013",
        genre: "Action",
        image: "https://i.pinimg.com/736x/46/4e/4f/464e4f16cf97af5a72af9b951b164f30.jpg", // GTA V Art
        rating: null,
    },
    {
        id: 2,
        title: "Cyberpunk 2077",
        year: "2020",
        genre: "RPG",
        image: "https://assetsio.gnwcdn.com/coaih8.jpg?width=2048&height=2048&fit=bounds&quality=85&format=jpg&auto=webp", // Cyberpunk Yellow Art
        rating: "Hot",
    },
    {
        id: 3,
        title: "Baldur's Gate 3",
        year: "2023",
        genre: "RPG",
        image: "https://images.launchbox-app.com/c8092034-fce0-4c8a-a46d-6b247038ec5e.jpg", // BG3 Art
        rating: "GOTY",
    },
    {
        id: 4,
        title: "God of War Ragnarök",
        year: "2022",
        genre: "Action",
        image: "https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png",
        rating: "Must Play",
    },
    {
        id: 5,
        title: "Resident Evil 4",
        year: "2023",
        genre: "Horror",
        image: "https://upload.wikimedia.org/wikipedia/ru/thumb/6/62/Resident_Evil_4_remake.png/960px-Resident_Evil_4_remake.png",
        rating: null,
    },
]

export function HotGames() {
    return (
        <section className="py-10">
            <div className="container mx-auto px-4">
                {/* Заголовок выезжает слева */}
                <motion.div
                    className="flex items-center justify-between mb-8"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl font-bold text-white">Горячие новинки</h2>
                </motion.div>

                {/* Слайдер появляется плавно (Fade In) */}
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
                            {games.map((game) => (
                                <CarouselItem key={game.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                    <div className="group cursor-pointer select-none">
                                        <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-lg mb-4">
                                            {game.rating && (
                                                <Badge className="absolute top-4 right-4 z-10 bg-[#ff2e2e] hover:bg-[#d61e1e] text-white border-0 px-3 py-1 text-xs font-bold shadow-md">
                                                    {game.rating}
                                                </Badge>
                                            )}
                                            <Image
                                                src={game.image}
                                                alt={game.title}
                                                fill
                                                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>
                                        <div className="pl-1">
                                            <h3 className="text-xl font-bold text-white group-hover:text-[#ff2e2e] transition-colors truncate">
                                                {game.title}
                                            </h3>
                                            <p className="text-sm text-gray-400 mt-1 font-medium">
                                                {game.year} • {game.genre}
                                            </p>
                                        </div>
                                    </div>
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