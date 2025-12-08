"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-black">
            {/* Анимированный фон */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://cdn.mos.cms.futurecdn.net/PjhveTjTLLAvSuSeZsjGsJ-1920-80.jpg"
                    alt="Elden Ring Background"
                    className="w-full h-full object-cover opacity-80"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
            </div>

            <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
                <div className="max-w-2xl space-y-6 pt-20">

                    {/* Анимация бейджа */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <Badge
                            variant="secondary"
                            className="bg-white/10 hover:bg-white/20 text-white border-0 px-4 py-1.5 text-xs font-medium uppercase tracking-wider w-fit"
                        >
                            Game of the Year
                        </Badge>
                    </motion.div>

                    {/* Анимация заголовка */}
                    <motion.h1
                        className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.9]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                    >
                        Elden Ring
                    </motion.h1>

                    {/* Анимация текста */}
                    <motion.p
                        className="text-lg text-gray-300 leading-relaxed max-w-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.9 }}
                    >
                        Восстань, погасшая душа! Исследуй Междуземье, сражайся с полубогами
                        и стань новым повелителем Элдена в шедевре от FromSoftware.
                    </motion.p>

                    {/* Анимация кнопки */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 1.1 }}
                        className="pt-4"
                    >
                        <Button
                            size="lg"
                            className="bg-[#ff2e2e] p-8 hover:bg-[#d61e1e] text-white text-xl font-semibold rounded-full px-6 transition-transform hover:scale-105"
                        >
                            <Play className="mr-2 h-4 w-4 fill-current" />
                            Смотреть детали
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}