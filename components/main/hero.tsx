"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-black">
            <div className="absolute inset-0 z-0">
                <img
                    src="./hero.jpg"
                    alt="Clair Obscur: Expedition 33 Background"
                    className="w-full h-full object-cover opacity-80"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
            </div>

            <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
                <div className="max-w-4xl space-y-6 pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <Badge
                            variant="secondary"
                            className="bg-white/10 hover:bg-white/20 text-white border-0 px-4 py-1.5 text-xs font-medium uppercase tracking-wider w-fit"
                        >
                            Game of the Year 2025
                        </Badge>
                    </motion.div>

                    <motion.h1
                        className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.9]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                    >
                        Clair Obscur: <br /> Expedition 33
                    </motion.h1>

                    <motion.p
                        className="text-lg text-gray-300 leading-relaxed max-w-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.9 }}
                    >
                        Раз в год Художница пишет на монолите число, и все люди этого возраста
                        обращаются в прах. Вступай в Expedition 33 и прерви цикл смерти в этом сюрреалистичном шедевре.
                    </motion.p>
                </div>
            </div>
        </section>
    )
}