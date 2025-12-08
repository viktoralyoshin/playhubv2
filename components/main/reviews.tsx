"use client"

import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Heart, MessageCircle, Quote } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, Variants } from "framer-motion" // <--- 1. Импортируем Variants

// Типы для моков
type Review = {
    id: number
    user: {
        name: string
        avatar: string
        handle: string
    }
    game: {
        title: string
        image: string
    }
    score: number
    text: string
    likes: number
    comments: number
    date: string
}

const reviews: Review[] = [
    {
        id: 1,
        user: { name: "AlexGamer", avatar: "AG", handle: "@alex_g" },
        game: {
            title: "Baldur's Gate 3",
            image: "https://image.api.playstation.com/vulcan/ap/rnd/202302/2321/3098481c9164bb5f33069b37e49fba1a572ea3b8f548e476.png"
        },
        score: 98,
        text: "Лариан сотворили чудо. Вариативность зашкаливает, каждый квест можно пройти десятью способами. Это новый эталон RPG на годы вперед.",
        likes: 245,
        comments: 42,
        date: "2 часа назад"
    },
    {
        id: 2,
        user: { name: "CyberSamurai", avatar: "CS", handle: "@wake_up" },
        game: {
            title: "Cyberpunk 2077: Phantom Liberty",
            image: "https://image.api.playstation.com/vulcan/ap/rnd/202009/1717/B2aAVGdvVw2j4i7J.png"
        },
        score: 85,
        text: "Дополнение спасло игру. Идрис Эльба крут, сюжет мрачный и шпионский. Баги починили, но физика машин всё еще утюги.",
        likes: 120,
        comments: 15,
        date: "5 часов назад"
    },
    {
        id: 3,
        user: { name: "HollowKnight", avatar: "HK", handle: "@soul_master" },
        game: {
            title: "Starfield",
            image: "https://image.api.playstation.com/vulcan/ap/rnd/202306/1219/60eca3798545cb63d20111a43c49a37e8c33a90892c90772.png"
        },
        score: 65,
        text: "Космос пустой. Бесконечные загрузки убивают атмосферу исследования. Стрельба неплохая, но это не уровень 2024 года. Разочарован.",
        likes: 890,
        comments: 356,
        date: "Вчера"
    },
]

const getRatingStyle = (score: number) => {
    if (score >= 90) return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
    if (score >= 70) return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20"
    if (score >= 50) return "text-orange-500 bg-orange-500/10 border-orange-500/20"
    return "text-red-500 bg-red-500/10 border-red-500/20"
}

export function Reviews() {
    // 2. Явно указываем тип Variants
    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    }

    // 2. Явно указываем тип Variants
    const item: Variants = {
        hidden: { opacity: 0, y: 50 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut" // Теперь TypeScript понимает, что это допустимое значение
            }
        }
    }

    return (
        <section className="py-20 relative">
            <div className="container mx-auto px-4">

                <motion.div
                    className="flex items-center justify-between mb-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Лента сообщества</h2>
                        <p className="text-gray-400">Что проходят и обсуждают прямо сейчас</p>
                    </div>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    {reviews.map((review) => (
                        <motion.div key={review.id} variants={item}>
                            <Card className="bg-[#121212] border-white/5 overflow-hidden flex flex-col hover:border-white/10 transition-colors group h-full">

                                <div className="relative h-32 w-full overflow-hidden">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center opacity-60 transition-transform duration-700 group-hover:scale-105"
                                        style={{ backgroundImage: `url(${review.game.image})` }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/50 to-transparent" />

                                    <div className="absolute top-4 right-4">
                                        <div className={cn(
                                            "flex items-center justify-center w-12 h-12 rounded-lg border backdrop-blur-md font-black text-xl shadow-xl",
                                            getRatingStyle(review.score)
                                        )}>
                                            {review.score}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 pt-0 flex-grow flex flex-col relative z-10 -mt-8">

                                    <div className="flex items-end gap-3 mb-4">
                                        <Avatar className="w-12 h-12 border-2 border-[#121212] shadow-lg">
                                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${review.user.name}`} />
                                            <AvatarFallback>{review.user.avatar}</AvatarFallback>
                                        </Avatar>
                                        <div className="mb-1">
                                            <h4 className="text-white font-bold leading-none line-clamp-1">{review.game.title}</h4>
                                            <span className="text-xs text-gray-500">{review.user.handle}</span>
                                        </div>
                                    </div>

                                    <div className="mb-6 relative">
                                        <Quote className="absolute -top-1 -left-1 w-4 h-4 text-gray-700 rotate-180" />
                                        <p className="text-gray-300 text-sm leading-relaxed pl-4 line-clamp-3">
                                            {review.text}
                                        </p>
                                    </div>

                                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5 text-gray-500 text-xs">
                                        <div className="flex gap-4">
                                            <button className="flex items-center gap-1.5 hover:text-[#ff2e2e] transition-colors group/btn">
                                                <Heart size={16} className="group-hover/btn:fill-[#ff2e2e]" />
                                                <span>{review.likes}</span>
                                            </button>
                                            <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                                                <MessageCircle size={16} />
                                                <span>{review.comments}</span>
                                            </button>
                                        </div>
                                        <span>{review.date}</span>
                                    </div>

                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    )
}