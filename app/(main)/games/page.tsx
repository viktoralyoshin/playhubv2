"use client"

import React, { useState, useEffect } from "react"
import { GameCard } from "@/components/games/game-card"
import { GameCardSkeleton } from "@/components/games/game-card-skeleton"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Search, ChevronLeft, ChevronRight, Loader2, ArrowLeft, SlidersHorizontal } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useDebounce } from "@/hooks/useDebounce"
import { useGamesCatalog } from "@/hooks/useCatalog"
import { GameOrderBy } from "@/types/game.types"

export default function GamesPage() {
    const [page, setPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState("")
    const [orderBy, setOrderBy] = useState<GameOrderBy>(GameOrderBy.RATING)
    const limit = 12

    const debouncedSearch = useDebounce(searchQuery, 500)

    const {
        data: games = [],
        isLoading,
        isPlaceholderData,
        isFetching
    } = useGamesCatalog(page, limit, debouncedSearch, orderBy)

    useEffect(() => {
        setPage(1)
    }, [debouncedSearch, orderBy])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div className="bg-[#050505] min-h-screen text-white pt-24 pb-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tight mb-2">Каталог игр</h1>
                        <p className="text-gray-400">
                            {isLoading ? "Загрузка..." : `Показано на странице: ${games.length}`}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                        {!searchQuery && (
                            <div className="w-full sm:w-[200px]">
                                <label className="text-[10px] uppercase font-black text-gray-500 mb-1.5 block tracking-widest">Сортировка</label>
                                <Select
                                    value={orderBy.toString()}
                                    onValueChange={(v) => setOrderBy(Number(v))}
                                >
                                    <SelectTrigger className="bg-[#121212] border-white/10 h-11 focus:ring-[#ff2e2e] text-xs font-bold uppercase">
                                        <SlidersHorizontal className="w-3 h-3 mr-2 text-gray-500" />
                                        <SelectValue placeholder="Сортировать по" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#121212] border-white/10 text-white">
                                        <SelectItem value={GameOrderBy.RATING.toString()} className="focus:bg-[#ff2e2e] focus:text-white uppercase text-xs font-bold">
                                            По рейтингу
                                        </SelectItem>
                                        <SelectItem value={GameOrderBy.RELEASE_DATE.toString()} className="focus:bg-[#ff2e2e] focus:text-white uppercase text-xs font-bold">
                                            По дате релиза
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                        <div className="w-full md:w-[350px]">
                            <label className="text-[10px] uppercase font-black text-gray-500 mb-1.5 block tracking-widest">Поиск</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                                <Input
                                    placeholder="Название игры..."
                                    className="pl-10 bg-[#121212] border-white/10 focus-visible:ring-[#ff2e2e] h-11 text-sm font-medium"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {isFetching && !isLoading && (
                                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 text-[#ff2e2e] w-4 h-4 animate-spin" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative min-h-[400px]">
                    <AnimatePresence>
                        {isPlaceholderData && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-20 bg-black/20 backdrop-blur-[1px] flex justify-center pt-20"
                            >
                                <div className="bg-[#121212] p-4 rounded-full h-fit border border-white/10 shadow-2xl">
                                    <Loader2 className="animate-spin text-[#ff2e2e] h-6 w-6" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {isLoading ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                            {Array.from({ length: limit }).map((_, i) => (
                                <GameCardSkeleton key={i} />
                            ))}
                        </div>
                    ) : games.length > 0 ? (
                        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                            <AnimatePresence mode="popLayout">
                                {games.map((game) => (
                                    <GameCard key={game.id} game={game} />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-24 bg-[#121212]/30 rounded-3xl border border-dashed border-white/10"
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4 text-gray-600">
                                {searchQuery ? <Search size={32} /> : <ArrowLeft size={32} />}
                            </div>

                            {searchQuery ? (
                                <>
                                    <h3 className="text-xl font-bold text-white mb-2">Ничего не найдено</h3>
                                    <p className="text-gray-400 mb-6 font-medium">Игры по запросу «{searchQuery}» нет в каталоге</p>
                                    <Button
                                        variant="outline"
                                        onClick={() => setSearchQuery("")}
                                        className="border-[#ff2e2e] text-[#ff2e2e] hover:bg-[#ff2e2e] hover:text-white transition-all font-bold uppercase text-xs"
                                    >
                                        Очистить поиск
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <h3 className="text-xl font-bold text-white mb-2">Конец каталога</h3>
                                    <p className="text-gray-400 mb-6 font-medium">На этой странице игр больше нет</p>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setPage(1)
                                            scrollToTop()
                                        }}
                                        className="border-white/10 hover:bg-white/5 font-bold uppercase text-xs"
                                    >
                                        Вернуться на начало
                                    </Button>
                                </>
                            )}
                        </motion.div>
                    )}
                </div>
                {(games.length > 0 || page > 1) && (
                    <div className="mt-16 flex justify-center items-center gap-4">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setPage(p => Math.max(1, p - 1))
                                scrollToTop()
                            }}
                            disabled={page === 1 || isLoading}
                            className="border-white/10 bg-[#121212] hover:bg-[#ff2e2e] hover:text-white transition-all h-11 font-bold uppercase text-xs"
                        >
                            <ChevronLeft className="h-4 w-4 mr-2" /> Назад
                        </Button>

                        <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-black hidden sm:inline">Стр.</span>
                            <span className="text-sm font-black bg-[#ff2e2e] text-white px-4 py-2 rounded-lg shadow-[0_0_20px_rgba(255,46,46,0.3)]">
                                {page}
                            </span>
                        </div>

                        <Button
                            variant="outline"
                            onClick={() => {
                                setPage(p => p + 1)
                                scrollToTop()
                            }}
                            disabled={games.length < limit || isLoading}
                            className="border-white/10 bg-[#121212] hover:bg-[#ff2e2e] hover:text-white transition-all h-11 font-bold uppercase text-xs"
                        >
                            Вперед <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}