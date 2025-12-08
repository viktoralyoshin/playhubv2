"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Calendar, Monitor, Gamepad2 } from "lucide-react"
import { motion } from "framer-motion"

// Данные
const mainRelease = {
    title: "S.T.A.L.K.E.R. 2: Heart of Chornobyl",
    date: "20 Ноября 2024",
    image: "https://cdn1.epicgames.com/offer/602a0ef0aceb46cca62445439661d712/EGS_STALKER2HeartofChornobylDeluxe_GSCGameWorld_Bundles_S1_2560x1440-5ecbd69787e53703c1d34f2b515d6a74", // Или любой другой арт
    platforms: ["PC", "Xbox"],
    desc: "Зона отчуждения ждет. Нелинейный сюжет, графика на Unreal Engine 5 и хардкорное выживание.",
}

const upcomingList = [
    {
        id: 1,
        title: "Silent Hill 2 Remake",
        date: "8 Октября 2024",
        image: "https://www.gamewallpapers.com/img_script/mobile_dir2/img.php?src=wallpaper_silent_hill_2_2022_01_1440x2560.jpg&width=253&height=450&crop-to-fit&sharpen",
        platforms: ["PC", "PS5"],
    },
    {
        id: 2,
        title: "Assassin's Creed Shadows",
        date: "15 Ноября 2024",
        image: "https://4kwallpapers.com/images/wallpapers/assassins-creed-1080x2160-16763.jpg",
        platforms: ["PC", "PS5", "Xbox"],
    },
    {
        id: 3,
        title: "Avowed",
        date: "18 Февраля 2025",
        image: "https://assets.xboxservices.com/assets/fa/12/fa1203f4-a126-41ff-ba6e-6b3e88ca0f19.jpg?n=49299933_GLP-Page-Hero-0_1083x1222_02.jpg",
        platforms: ["PC", "Xbox"],
    },
    {
        id: 4,
        title: "Monster Hunter Wilds",
        date: "2025",
        image: "https://images.gog.com/4a0a83c6039b2dd0ec661f1cec9d9cca43ef1750431e5dba68f95adfc8998fdb_glx_vertical_cover.webp?namespace=gamesdb",
        platforms: ["PC", "PS5", "Xbox"],
    },
]

export function Upcoming() {
    // Варианты анимации для списка
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15 // Задержка между появлением каждого элемента списка
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, x: 50 },
        show: { opacity: 1, x: 0 }
    }

    return (
        <section className="py-20 bg-[#080808]">
            <div className="container mx-auto px-4">

                <motion.div
                    className="flex items-end justify-between mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Скоро выйдут</h2>
                        <p className="text-gray-400">Добавь в бэклог, чтобы не пропустить релиз</p>
                    </div>
                    <Button variant="outline" className="hidden md:flex text-white border-white/10 hover:bg-white/10">
                        Полный календарь
                    </Button>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                    {/* ЛЕВАЯ КОЛОНКА: Выезжает слева */}
                    <motion.div
                        className="lg:col-span-3 group relative rounded-2xl overflow-hidden border border-white/10 h-[500px]"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <img
                            src={mainRelease.image}
                            alt="Main Release"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                        <div className="absolute bottom-0 left-0 p-8 w-full">
                            {/* Контент внутри можно не анимировать отдельно, он выедет вместе с блоком */}
                            <div className="flex items-center gap-3 mb-4">
                                <Badge className="bg-[#ff2e2e] hover:bg-[#d61e1e] text-white border-0">Самое ожидаемое</Badge>
                                <div className="flex gap-2">
                                    {mainRelease.platforms.map(p => (
                                        <Badge key={p} variant="outline" className="text-xs border-white/30 text-white bg-black/50 backdrop-blur-md">{p}</Badge>
                                    ))}
                                </div>
                            </div>
                            <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">{mainRelease.title}</h3>
                            <p className="text-gray-300 text-lg mb-6 max-w-xl line-clamp-2">{mainRelease.desc}</p>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-[#ff2e2e] font-bold text-lg bg-black/60 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
                                    <Calendar size={20} />
                                    {mainRelease.date}
                                </div>
                                <Button className="bg-white text-black hover:bg-gray-200 font-bold"><Bell className="mr-2 h-4 w-4" />Жду игру</Button>
                            </div>
                        </div>
                    </motion.div>

                    {/* ПРАВАЯ КОЛОНКА: Список с каскадной анимацией */}
                    <motion.div
                        className="lg:col-span-2 flex flex-col justify-between h-full space-y-4"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                    >
                        {upcomingList.map((game) => (
                            <motion.div
                                key={game.id}
                                variants={itemVariants} // Используем вариант для ребенка
                                className="flex items-center gap-4 p-4 rounded-xl bg-[#121212] border border-white/5 hover:border-[#ff2e2e]/50 hover:bg-[#1a1a1a] transition-all group cursor-pointer"
                            >
                                <div className="h-16 w-12 flex-shrink-0 overflow-hidden rounded-md bg-zinc-800">
                                    <img src={game.image} alt={game.title} className="h-full w-full object-cover" />
                                </div>
                                <div className="flex-grow">
                                    <h4 className="font-bold text-white group-hover:text-[#ff2e2e] transition-colors line-clamp-1">{game.title}</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-sm text-gray-500 flex items-center gap-1"><Calendar size={12} /> {game.date}</span>
                                    </div>
                                </div>
                                <div className="flex gap-1 text-gray-500">
                                    <Monitor size={16} />
                                    <Gamepad2 size={16} />
                                </div>
                            </motion.div>
                        ))}
                        <Button variant="outline" className="w-full mt-2 md:hidden text-white border-white/10">Смотреть весь календарь</Button>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}