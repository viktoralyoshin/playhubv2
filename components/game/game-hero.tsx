import React from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Calendar, Monitor, Star } from "lucide-react"
import { IGame } from "@/types/game.types"

export function GameHero({ game }: { game: IGame }) {
    const background = game.screenshots?.[0] || game.artwork_urls?.[0] || game.cover_url

    return (
        <section className="relative h-[70vh] w-full overflow-hidden">
            <div className="absolute inset-0 z-0">
                {background && (
                    <Image
                        src={background}
                        alt={game.name}
                        fill
                        priority
                        className="object-cover opacity-40 blur-[2px]"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
            </div>

            <div className="container relative z-10 mx-auto h-full px-4 flex items-end pb-12">
                <div className="flex flex-col md:flex-row gap-8 items-end w-full">
                    <div className="relative w-48 md:w-64 aspect-[2/3] flex-shrink-0 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl hidden md:block">
                        <Image
                            src={game.cover_url || "/no-cover.png"}
                            alt={game.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex-grow mb-4">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {game.genres?.slice(0, 3).map(genre => (
                                <Badge key={genre} className="bg-[#ff2e2e] hover:bg-[#d61e1e] border-0">
                                    {genre}
                                </Badge>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6">
                            {game.name}
                        </h1>

                        <div className="flex flex-wrap gap-6 text-sm md:text-base font-bold text-white/80">
                            <div className="flex items-center gap-2">
                                <Calendar size={18} className="text-[#ff2e2e]" />
                                {game.first_release_date || "TBA"}
                            </div>
                            <div className="flex items-center gap-2">
                                <Monitor size={18} className="text-[#ff2e2e]" />
                                {game.platforms?.slice(0, 3).join(", ")}
                            </div>
                            <div className="flex items-center gap-2">
                                <Star size={18} className="text-yellow-500 fill-yellow-500" />
                                {game.playhub_rating ? game.playhub_rating : "N/A"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}