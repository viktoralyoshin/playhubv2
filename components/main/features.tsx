"use client"

import React from "react"
import { Library, MessageSquare, Search, CheckCircle2, Clock, Gamepad2 } from "lucide-react"
import { motion, Variants } from "framer-motion"

export function Features() {
    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const item: Variants = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 50 }
        }
    }

    return (
        <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-[#050505] to-[#050505] -z-10" />

            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-16 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase mb-4">
                        Твой игровой <span className="text-[#ff2e2e]">Хаб</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Единая платформа для отслеживания прогресса, поиска новых игр и обсуждения шедевров.
                    </p>
                </motion.div>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    <motion.div variants={item} className="group relative p-8 rounded-3xl bg-zinc-900/50 border border-white/5 overflow-hidden hover:border-white/10 transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Library size={120} /></div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-[#ff2e2e]/10 rounded-xl flex items-center justify-center mb-6 text-[#ff2e2e]"><Gamepad2 size={24} /></div>
                            <h3 className="text-2xl font-bold text-white mb-3">Личная Библиотека</h3>
                            <p className="text-gray-400 mb-6 leading-relaxed">Организуй коллекцию: отмечай, что проходишь сейчас, что прошел, а что забросил.</p>
                            <div className="space-y-3 bg-black/40 p-4 rounded-xl border border-white/5">
                                <div className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle2 size={16} className="text-emerald-500" /><span>Elden Ring</span></div>
                                <div className="flex items-center gap-3 text-sm text-gray-300"><Gamepad2 size={16} className="text-blue-500" /><span>Cyberpunk 2077</span></div>
                                <div className="flex items-center gap-3 text-sm text-gray-300"><Clock size={16} className="text-orange-500" /><span>GTA VI</span></div>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div variants={item} className="group relative p-8 rounded-3xl bg-zinc-900/80 border border-white/10 overflow-hidden md:-mt-4 md:mb-4 shadow-2xl shadow-black/50">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#ff2e2e]/5 to-transparent opacity-50" />
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-[#ff2e2e] rounded-xl flex items-center justify-center mb-6 text-white shadow-lg shadow-red-900/20"><MessageSquare size={24} /></div>
                            <h3 className="text-2xl font-bold text-white mb-3">Честные Рейтинги</h3>
                            <p className="text-gray-400 mb-6 leading-relaxed">Никаких накруток. Рейтинг строится на основе оценок реальных игроков по 100-балльной шкале.</p>
                            <div className="bg-[#1a1a1a] p-4 rounded-xl border border-white/10 relative space-y-4">
                                <div className="flex gap-4 items-start">
                                    <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center"><span className="font-black text-emerald-500 text-lg">96</span></div>
                                    <div className="space-y-1.5"><p className="text-xs text-gray-300 italic">"Абсолютный шедевр..."</p></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div variants={item} className="group relative p-8 rounded-3xl bg-zinc-900/50 border border-white/5 overflow-hidden hover:border-white/10 transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Search size={120} /></div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-[#ff2e2e]/10 rounded-xl flex items-center justify-center mb-6 text-[#ff2e2e]"><Search size={24} /></div>
                            <h3 className="text-2xl font-bold text-white mb-3">Умный Поиск</h3>
                            <p className="text-gray-400 mb-6 leading-relaxed">Огромная база данных игр, синхронизированная с IGDB. Найдем всё: от инди до AAA.</p>
                            <div className="relative">
                                <div className="h-10 bg-black/40 border border-white/10 rounded-lg flex items-center px-3 text-sm text-gray-500"><Search size={16} className="mr-2" />Witcher 3</div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}