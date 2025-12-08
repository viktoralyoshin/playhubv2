"use client"

import React from "react"
import { GameHero } from "@/components/game/game-hero"
import { GameContent } from "@/components/game/game-content"
import { GameSidebar } from "@/components/game/game-sidebar"

// MOCK DATA (Имитация ответа от API)
// В реальном приложении данные будут приходить из функции fetchGame(params.slug)
const gameData = {
    title: "Cyberpunk 2077: Phantom Liberty",
    dev: "CD Projekt RED",
    pub: "CD Projekt",
    releaseDate: "26 сен. 2023",
    platforms: ["PC", "PS5", "Xbox Series X"],
    genres: ["RPG", "Action", "Cyberpunk", "Open World"],
    rating: 89,
    userRating: 92,
    desc: "Phantom Liberty — это сюжетное дополнение в жанре шпионского триллера для Cyberpunk 2077. Вернитесь в роль кибернаемника Ви и станьте шпионом НСША, чтобы спасти саму главу государства. Найдите союзников в Песьем городе, самом опасном районе Найт-Сити, чтобы распутать клубок шпионских и политических интриг.",
    background: "https://images.nvidia.com/aem-dam/Solutions/geforce/campaigns/cyberpunk-2077/slider/geforce-cp2077-phantom-liberty-slider-rtx-on-2560.jpg",
    cover: "https://assetsio.gnwcdn.com/coaih8.jpg?width=2048&height=2048&fit=bounds&quality=85&format=jpg&auto=webp",
    screenshots: [
        "https://cdn2.unrealengine.com/cyberpunk-2077-3840x2160-b719b02e9cf3.jpg",
        "https://assetsio.gnwcdn.com/cyberpunk-red-rulebook-artwork.png?width=690&quality=85&format=jpg&dpr=3&auto=webp",
        "https://static.cdprojektred.com/cms.cdprojektred.com/16x9_big/872822c5e50dc71f345416098d29fc3ae5cd26c1-1280x720.jpg",
        "https://assetsio.gnwcdn.com/cyberpunk-red-rpg-%20artwork.png?width=690&quality=85&format=jpg&dpr=3&auto=webp"
    ]
}

export default function GamePage({ params }: { params: { slug: string } }) {
    return (
        <div className="bg-[#050505] min-h-screen text-white">
            <main>
                <GameHero game={gameData} />

                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Левая колонка */}
                        <div className="lg:col-span-8">
                            <GameContent game={gameData} />
                        </div>
                        {/* Правая колонка (Сайдбар) */}
                        <div className="lg:col-span-4">
                            <GameSidebar game={gameData} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}