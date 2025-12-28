"use client"

import React from "react"
import { MessageSquare, Library } from "lucide-react"
import { motion } from "framer-motion"

interface ProfileStatsProps {
    reviewsCount?: number
    libraryCount?: number
}

export function ProfileStats({ reviewsCount = 0, libraryCount = 0 }: ProfileStatsProps) {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    }

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10"
        >
            <motion.div variants={item} className="bg-[#121212] border border-white/5 p-6 rounded-2xl flex flex-col justify-between group hover:border-white/10 transition-colors">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2.5 bg-[#ff2e2e]/10 rounded-xl text-[#ff2e2e]">
                        <MessageSquare size={22} />
                    </div>
                    <span className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em]">Community Feedback</span>
                </div>
                <div>
                    <div className="text-4xl font-black text-white group-hover:text-[#ff2e2e] transition-colors">
                        {reviewsCount}
                    </div>
                    <div className="text-xs text-zinc-500 font-bold uppercase mt-1">Написано отзывов</div>
                </div>
            </motion.div>
            <motion.div variants={item} className="bg-[#121212] border border-white/5 p-6 rounded-2xl flex flex-col justify-between group hover:border-white/10 transition-colors">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-500">
                        <Library size={22} />
                    </div>
                    <span className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em]">Game Collection</span>
                </div>
                <div>
                    <div className="text-4xl font-black text-white group-hover:text-purple-400 transition-colors">
                        {libraryCount}
                    </div>
                    <div className="text-xs text-zinc-500 font-bold uppercase mt-1">Игр в коллекции</div>
                </div>
            </motion.div>
        </motion.div>
    )
}