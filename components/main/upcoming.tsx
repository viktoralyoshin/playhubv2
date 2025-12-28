"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Calendar, Monitor, Gamepad2, Loader2, Check } from "lucide-react"
import { motion } from "framer-motion"
import { useUpcomingGames } from "@/hooks/useGame"
import { useUpdateLibraryStatus } from "@/hooks/useLibrary"
import { GameStatus } from "@/types/library.types"

export function Upcoming() {
    const router = useRouter()
    const { data: upcomingGames, isLoading } = useUpcomingGames(5)

    const { mutate: updateStatus, isPending } = useUpdateLibraryStatus()

    const mainRelease = upcomingGames?.[0]
    const otherReleases = upcomingGames?.slice(1)

    const handleNavigate = (gameSlug: string) => {
        router.push(`/games/${gameSlug}`)
    }

    const handleAddToWaiting = (e: React.MouseEvent, gameId: string) => {
        e.stopPropagation()
        updateStatus({
            gameId,
            status: GameStatus.WAITING
        })
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, x: 50 },
        show: { opacity: 1, x: 0 }
    }

    if (isLoading) return <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-[#ff2e2e]" /></div>

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
                        <p className="text-gray-400">Добавь в библиотеку, чтобы не пропустить релиз</p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {mainRelease && (
                        <motion.div
                            onClick={() => handleNavigate(mainRelease.slug)}
                            className="lg:col-span-3 group relative rounded-2xl overflow-hidden border border-white/10 h-[500px] cursor-pointer"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <img
                                src={mainRelease.cover_url}
                                alt={mainRelease.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <div className="flex items-center gap-3 mb-4">
                                    <Badge className="bg-[#ff2e2e] text-white border-0">Ожидаемый хит</Badge>
                                    <div className="flex gap-2">
                                        {mainRelease.platforms?.slice(0, 2).map(p => (
                                            <Badge key={p} variant="outline" className="text-white border-white/30 bg-black/50">{p}</Badge>
                                        ))}
                                    </div>
                                </div>
                                <h3 className="text-4xl md:text-5xl font-black text-white uppercase mb-4">{mainRelease.name}</h3>
                                <p className="text-gray-300 text-lg mb-6 max-w-xl line-clamp-2">{mainRelease.summary}</p>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 text-[#ff2e2e] font-bold text-lg bg-black/60 px-4 py-2 rounded-lg border border-white/10">
                                        <Calendar size={20} />
                                        {mainRelease.first_release_date}
                                    </div>
                                    <Button
                                        onClick={(e) => handleAddToWaiting(e, mainRelease.id.toString())}
                                        disabled={isPending}
                                        className="bg-white text-black hover:bg-gray-200 font-bold"
                                    >
                                        {isPending ? (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        ) : (
                                            <Bell className="mr-2 h-4 w-4" />
                                        )}
                                        Жду игру
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    <motion.div
                        className="lg:col-span-2 flex flex-col justify-start space-y-4"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                    >
                        {otherReleases?.map((game) => (
                            <motion.div
                                key={game.id}
                                variants={itemVariants}
                                onClick={() => handleNavigate(game.slug)}
                                className="flex items-center gap-4 p-4 rounded-xl bg-[#121212] border border-white/5 hover:border-[#ff2e2e]/50 hover:bg-[#1a1a1a] transition-all group cursor-pointer"
                            >
                                <div className="h-16 w-12 flex-shrink-0 overflow-hidden rounded-md bg-zinc-800">
                                    <img src={game.cover_url} alt={game.name} className="h-full w-full object-cover" />
                                </div>
                                <div className="flex-grow">
                                    <h4 className="font-bold text-white group-hover:text-[#ff2e2e] transition-colors line-clamp-1">{game.name}</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-sm text-gray-500 flex items-center gap-1">
                                            <Calendar size={12} /> {game.first_release_date}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-1 text-gray-500">
                                    <Monitor size={16} />
                                    <Gamepad2 size={16} />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}