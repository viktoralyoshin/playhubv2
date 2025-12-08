"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Trophy, Star, Share2, Monitor, Gamepad2, Flag } from "lucide-react"
import { motion } from "framer-motion"

interface GameSidebarProps {
    game: {
        userRating: number
        releaseDate: string
        dev: string
        pub: string
    }
}

export function GameSidebar({ game }: GameSidebarProps) {
    const [status, setStatus] = useState("plan") // plan | playing | completed | dropped

    return (
        <div className="sticky top-24 space-y-6">
            {/* 1. Блок действий */}
            <div className="bg-[#121212] rounded-xl border border-white/10 p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff2e2e]/10 blur-3xl rounded-full -z-10" />

                <div className="flex items-center justify-between mb-6">
                    <div>
                        <div className="text-sm text-gray-400 font-medium">PlayHub Score</div>
                        <div className="text-5xl font-black text-white flex items-start tracking-tighter">
                            {game.userRating}
                            <span className="text-lg text-[#ff2e2e] mt-1 ml-1 font-bold">/ 100</span>
                        </div>
                    </div>
                    <div className="h-16 w-16 rounded-2xl border border-white/10 flex items-center justify-center bg-black shadow-inner">
                        <Trophy className="text-[#ff2e2e]" size={28} />
                    </div>
                </div>

                <div className="space-y-4">
                    <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger className="w-full h-14 bg-[#ff2e2e] border-0 text-white text-lg font-bold hover:bg-[#d61e1e] transition-all focus:ring-0 shadow-lg shadow-red-900/20">
                            <SelectValue placeholder="Статус" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
                            <SelectItem value="plan">В планы</SelectItem>
                            <SelectItem value="playing">Играю сейчас</SelectItem>
                            <SelectItem value="completed">Прошел</SelectItem>
                            <SelectItem value="dropped">Бросил</SelectItem>
                        </SelectContent>
                    </Select>

                    <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="h-12 border-white/10 hover:bg-white/5 hover:text-white bg-[#0a0a0a]">
                            <Star size={18} className="mr-2 text-yellow-500" /> Оценить
                        </Button>
                        <Button variant="outline" className="h-12 border-white/10 hover:bg-white/5 hover:text-white bg-[#0a0a0a]">
                            <Share2 size={18} className="mr-2" /> Поделиться
                        </Button>
                    </div>
                </div>

                {status === "playing" && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        className="mt-6 pt-6 border-t border-white/10"
                    >
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-400">Прогресс игры</span>
                            <span className="text-white font-bold">42%</span>
                        </div>
                        <Progress value={42} className="h-2 bg-white/10" indicatorClassName="bg-[#ff2e2e]" />
                    </motion.div>
                )}
            </div>

            {/* 2. Информация */}
            <div className="bg-[#121212] rounded-xl border border-white/10 p-6 space-y-4">
                <h3 className="font-bold text-white mb-2">Информация</h3>
                <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-gray-500">Платформы</span>
                    <div className="flex gap-2 text-gray-300">
                        <Monitor size={16} />
                        <Gamepad2 size={16} />
                    </div>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-gray-500">Дата выхода</span>
                    <span className="text-white text-sm">{game.releaseDate}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-gray-500">Разработчик</span>
                    <span className="text-white text-sm">{game.dev}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-gray-500">Издатель</span>
                    <span className="text-white text-sm">{game.pub}</span>
                </div>
                <Button variant="ghost" className="w-full text-xs text-gray-500 hover:text-[#ff2e2e] mt-2 h-8">
                    <Flag size={12} className="mr-2" /> Сообщить об ошибке
                </Button>
            </div>

            {/* 3. Магазин */}
            <div className="bg-[#121212] rounded-xl border border-white/10 p-6">
                <h3 className="font-bold text-white mb-4">Где купить</h3>
                <a href="#" className="flex items-center justify-between group p-3 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center text-black font-bold text-xs">S</div>
                        <span className="text-sm font-medium">Steam</span>
                    </div>
                    <span className="text-[#ff2e2e] font-bold text-sm group-hover:underline">19.99$</span>
                </a>
            </div>
        </div>
    )
}