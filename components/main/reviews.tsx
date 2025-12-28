"use client"

import React from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { motion, Variants } from "framer-motion"
import { useSocial } from "@/hooks/useSocial"
import { ReviewCard } from "../feed/review_card"

export function Reviews() {
    const { useFeed } = useSocial()
    const { data: reviews, isLoading, isError } = useFeed(12)

    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 }
        }
    }

    return (
        <section className="py-20 relative bg-black">
            <div className="container mx-auto px-4">
                <motion.div
                    className="flex items-center justify-between mb-10"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <div>
                        <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">
                            Лента сообщества
                        </h2>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#ff2e2e] animate-pulse" />
                            <p className="text-gray-400 text-sm">Прямой эфир ваших впечатлений</p>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {isLoading ? (
                        Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="bg-[#121212] border border-white/5 rounded-2xl h-[350px] p-6 space-y-6"
                            >
                                <div className="flex items-center gap-4">
                                    <Skeleton className="h-12 w-12 rounded-full bg-white/5" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-32 bg-white/5" />
                                        <Skeleton className="h-3 w-20 bg-white/5" />
                                    </div>
                                </div>
                                <Skeleton className="h-32 w-full bg-white/5 rounded-xl" />
                                <Skeleton className="h-4 w-full bg-white/5 mt-auto" />
                            </div>
                        ))
                    ) : (
                        reviews?.map((review) => (
                            <ReviewCard
                                key={review.id}
                                review={review}
                                variants={itemVariants}
                            />
                        ))
                    )}
                </motion.div>
                {!isLoading && (!reviews || reviews.length === 0) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-32 bg-[#121212]/50 rounded-3xl border border-dashed border-white/10"
                    >
                        <p className="text-gray-500 font-medium">Лента пока пуста...</p>
                        <p className="text-gray-600 text-sm mt-2">Стань первым, кто оставит отзыв на игру!</p>
                    </motion.div>
                )}
                {isError && (
                    <div className="text-center py-20">
                        <p className="text-[#ff2e2e]">Не удалось загрузить ленту. Проверьте соединение.</p>
                    </div>
                )}
            </div>
        </section>
    )
}