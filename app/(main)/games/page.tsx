"use client"

import React, { useState, useMemo } from "react"
import { GameCard } from "@/components/games/game-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet" // Для мобильных фильтров
import { Search, SlidersHorizontal, Filter } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// --- МОКОВЫЕ ДАННЫЕ (Много игр для теста) ---
const allGames = [
    { id: 1, title: "Elden Ring", year: "2022", rating: 96, genres: ["RPG", "Action"], platforms: ["PC", "PS5"], image: "https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/phvVT0qZfcRms5qDAk0SI3CM.png" },
    { id: 2, title: "Cyberpunk 2077", year: "2020", rating: 86, genres: ["RPG", "Sci-Fi"], platforms: ["PC", "Xbox"], image: "https://assetsio.gnwcdn.com/coaih8.jpg?width=2048&height=2048&fit=bounds&quality=85&format=jpg&auto=webp" },
    { id: 3, title: "Baldur's Gate 3", year: "2023", rating: 99, genres: ["RPG", "Strategy"], platforms: ["PC"], image: "https://images.launchbox-app.com/c8092034-fce0-4c8a-a46d-6b247038ec5e.jpg" },
    { id: 4, title: "God of War Ragnarök", year: "2022", rating: 94, genres: ["Action", "Adventure"], platforms: ["PS5"], image: "https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png" },
    { id: 5, title: "Alan Wake 2", year: "2023", rating: 89, genres: ["Horror"], platforms: ["PC", "Xbox"], image: "https://i.pinimg.com/736x/0a/b3/c2/0ab3c2b3eaa5d4a8a7b421d471e2560b.jpg" },
    { id: 6, title: "The Witcher 3", year: "2015", rating: 98, genres: ["RPG"], platforms: ["PC", "PS5", "Switch"], image: "https://i.pinimg.com/736x/5d/8a/41/5d8a41501af6aab5d2e754de44f58834.jpg" },
    { id: 7, title: "Hades", year: "2020", rating: 93, genres: ["Indie", "Action"], platforms: ["Switch", "PC"], image: "https://i.redd.it/b5fgag9c61n61.png" },
    { id: 8, title: "Resident Evil 4", year: "2023", rating: 92, genres: ["Horror", "Action"], platforms: ["PC", "PS5"], image: "https://upload.wikimedia.org/wikipedia/ru/thumb/6/62/Resident_Evil_4_remake.png/960px-Resident_Evil_4_remake.png" },
    { id: 9, title: "Stray", year: "2022", rating: 83, genres: ["Indie", "Adventure"], platforms: ["PS5", "PC"], image: "https://www.xtrafondos.com/wallpapers/vertical/stray-videojuego-11038.jpg" },
    { id: 10, title: "Red Dead Redemption 2", year: "2018", rating: 97, genres: ["Action", "Adventure"], platforms: ["Xbox", "PS5"], image: "https://4kwallpapers.com/images/wallpapers/red-dead-redemption-1080x2160-10618.jpg" },
]

// Списки для фильтров
const genresList = ["Action", "RPG", "Adventure", "Horror", "Indie", "Strategy", "Sci-Fi"]
const platformsList = ["PC", "PS5", "Xbox", "Switch"]

export default function GamesPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedGenres, setSelectedGenres] = useState<string[]>([])
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
    const [sortOrder, setSortOrder] = useState("popular") // popular | new | rating

    // --- ЛОГИКА ФИЛЬТРАЦИИ ---
    const filteredGames = useMemo(() => {
        return allGames
            .filter((game) => {
                // Поиск по названию
                const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase())
                // Фильтр по жанрам (если выбраны)
                const matchesGenre = selectedGenres.length === 0 || game.genres.some(g => selectedGenres.includes(g))
                // Фильтр по платформам
                const matchesPlatform = selectedPlatforms.length === 0 || game.platforms.some(p => selectedPlatforms.includes(p))

                return matchesSearch && matchesGenre && matchesPlatform
            })
            .sort((a, b) => {
                if (sortOrder === "new") return Number(b.year) - Number(a.year)
                if (sortOrder === "rating") return b.rating - a.rating
                return 0 // Default (Popular - по id или как есть)
            })
    }, [searchQuery, selectedGenres, selectedPlatforms, sortOrder])

    // Хендлеры чекбоксов
    const toggleGenre = (genre: string) => {
        setSelectedGenres(prev => prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre])
    }
    const togglePlatform = (platform: string) => {
        setSelectedPlatforms(prev => prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform])
    }

    // --- КОМПОНЕНТ ФИЛЬТРОВ (Чтобы не дублировать в мобильной версии) ---
    const FiltersContent = () => (
        <div className="space-y-8">
            {/* Жанры */}
            <div>
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <Filter size={16} /> Жанры
                </h3>
                <div className="space-y-3">
                    {genresList.map(genre => (
                        <div key={genre} className="flex items-center space-x-2">
                            <Checkbox
                                id={genre}
                                checked={selectedGenres.includes(genre)}
                                onCheckedChange={() => toggleGenre(genre)}
                                className="border-white/20 data-[state=checked]:bg-[#ff2e2e] data-[state=checked]:border-[#ff2e2e]"
                            />
                            <Label htmlFor={genre} className="text-gray-400 hover:text-white cursor-pointer transition-colors">
                                {genre}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="h-px bg-white/10" />

            {/* Платформы */}
            <div>
                <h3 className="text-white font-bold mb-4">Платформы</h3>
                <div className="space-y-3">
                    {platformsList.map(platform => (
                        <div key={platform} className="flex items-center space-x-2">
                            <Checkbox
                                id={platform}
                                checked={selectedPlatforms.includes(platform)}
                                onCheckedChange={() => togglePlatform(platform)}
                                className="border-white/20 data-[state=checked]:bg-[#ff2e2e] data-[state=checked]:border-[#ff2e2e]"
                            />
                            <Label htmlFor={platform} className="text-gray-400 hover:text-white cursor-pointer transition-colors">
                                {platform}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Кнопка сброса */}
            {(selectedGenres.length > 0 || selectedPlatforms.length > 0) && (
                <Button
                    variant="outline"
                    className="w-full mt-4 border-[#ff2e2e] text-[#ff2e2e] hover:bg-[#ff2e2e] hover:text-white"
                    onClick={() => { setSelectedGenres([]); setSelectedPlatforms([]); }}
                >
                    Сбросить фильтры
                </Button>
            )}
        </div>
    )

    return (
        <div className="bg-[#050505] min-h-screen text-white pt-24 pb-20">
            <div className="container mx-auto px-4">

                {/* ЗАГОЛОВОК И ПОИСК */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tight mb-2">Каталог игр</h1>
                        <p className="text-gray-400">Найдено игр: {filteredGames.length}</p>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        {/* Поле поиска */}
                        <div className="relative w-full md:w-[350px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                            <Input
                                placeholder="Поиск игры..."
                                className="pl-10 bg-[#121212] border-white/10 focus-visible:ring-[#ff2e2e] text-white h-11"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Мобильная кнопка фильтров */}
                        <div className="lg:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline" size="icon" className="h-11 w-11 border-white/10 bg-[#121212] text-white">
                                        <SlidersHorizontal size={18} />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="bg-[#0a0a0a] border-white/10 text-white w-[300px]">
                                    <div className="mt-6">
                                        <FiltersContent />
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

                    {/* САЙДБАР (Скрыт на мобильных, виден на Desktop) */}
                    <aside className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-28 bg-[#121212] border border-white/5 rounded-2xl p-6">
                            <FiltersContent />
                        </div>
                    </aside>

                    {/* СЕТКА ИГР */}
                    <div className="lg:col-span-3">

                        {/* Сортировка */}
                        <div className="flex justify-end mb-6">
                            <Select value={sortOrder} onValueChange={setSortOrder}>
                                <SelectTrigger className="w-[180px] bg-[#121212] border-white/10 text-white">
                                    <SelectValue placeholder="Сортировка" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#121212] border-white/10 text-white">
                                    <SelectItem value="popular">По популярности</SelectItem>
                                    <SelectItem value="new">Сначала новые</SelectItem>
                                    <SelectItem value="rating">Высокий рейтинг</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Сама сетка */}
                        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6">
                            <AnimatePresence>
                                {filteredGames.map((game) => (
                                    <GameCard key={game.id} game={game} />
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {/* Если ничего не найдено */}
                        {filteredGames.length === 0 && (
                            <div className="text-center py-20">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
                                    <Search size={32} className="text-gray-500" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Ничего не найдено</h3>
                                <p className="text-gray-400">Попробуйте изменить параметры фильтрации</p>
                                <Button
                                    variant="link"
                                    className="text-[#ff2e2e]"
                                    onClick={() => { setSearchQuery(""); setSelectedGenres([]); setSelectedPlatforms([]) }}
                                >
                                    Очистить все
                                </Button>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}