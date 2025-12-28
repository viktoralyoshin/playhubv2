"use client"

import React from "react"
import { useParams } from "next/navigation"
import { GameHero } from "@/components/game/game-hero"
import { GameContent } from "@/components/game/game-content"
import { GameSidebar } from "@/components/game/game-sidebar"
import { Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useGameBySlug } from "@/hooks/useGame"

export default function GamePage() {
    const params = useParams()
    const slug = params.slug as string

    const { data: game, isLoading, error } = useGameBySlug(slug)

    if (isLoading) {
        return (
            <div className="bg-[#050505] min-h-screen flex flex-col items-center justify-center text-white">
                <Loader2 className="h-12 w-12 animate-spin text-[#ff2e2e] mb-4" />
                <p className="text-gray-400 animate-pulse">Загружаем данные из Зоны...</p>
            </div>
        )
    }

    if (error || !game) {
        return (
            <div className="bg-[#050505] min-h-screen flex flex-col items-center justify-center text-white px-4 text-center">
                <AlertCircle className="h-16 w-16 text-gray-700 mb-6" />
                <h1 className="text-3xl font-black uppercase mb-2">Игра не найдена</h1>
                <p className="text-gray-400 mb-8 max-w-md">
                    Похоже, данный слаг ведет в тупик. Возможно, игра была удалена или вы ошиблись в адресе.
                </p>
                <Button asChild className="bg-[#ff2e2e] hover:bg-[#d61e1e]">
                    <Link href="/games">Вернуться в каталог</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="bg-[#050505] min-h-screen text-white">
            <main>
                <GameHero game={game} />
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-8">
                            <GameContent game={game} />
                        </div>
                        <div className="lg:col-span-4">
                            <GameSidebar game={game} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}