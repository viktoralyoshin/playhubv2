"use client"

import React from "react"
import { motion } from "framer-motion"
import { Zap } from "lucide-react"

export function AuthBanner() {
    return (
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r border-white/10 lg:flex overflow-hidden">
            {/* Анимированный фон */}
            <div className="absolute inset-0 bg-zinc-900">
                <motion.img
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.6 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src="https://pixiogaming.com/cdn/shop/articles/star-wars-jedi-survivor-pc-game-origin-cover.webp?v=1680904831"
                    alt="Auth Background"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
            </div>

            {/* Логотип (вылетает сверху) */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="relative z-20 flex items-center gap-2 text-lg font-medium"
            >
                <div className="bg-[#ff2e2e] rounded-lg p-1.5 flex items-center justify-center text-white">
                    <Zap size={20} fill="currentColor" />
                </div>
                <span className="font-black text-xl tracking-wide">PLAYHUB</span>
            </motion.div>

            {/* Цитата (выезжает снизу) */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="relative z-20 mt-auto"
            >
                <blockquote className="space-y-2">
                    <p className="text-lg leading-relaxed text-gray-200">
                        &ldquo;Это лучшая платформа для трекинга игр. Я наконец-то разгреб свой бэклог в Steam и нашел людей для коопа в Baldur's Gate 3.&rdquo;
                    </p>
                    <footer className="text-sm text-gray-400 font-medium">Sofia Davis, Top Reviewer</footer>
                </blockquote>
            </motion.div>
        </div>
    )
}