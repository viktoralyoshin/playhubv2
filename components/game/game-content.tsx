"use client"

import React from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Clock, Cpu } from "lucide-react"
import { Reviews } from "@/components/main/reviews"

interface GameContentProps {
    game: {
        desc: string
        screenshots: string[]
    }
}

export function GameContent({ game }: GameContentProps) {
    return (
        <div className="lg:pt-10 space-y-10">
            <Tabs defaultValue="about" className="w-full">
                <TabsList className="bg-[#121212] border border-white/5 w-full justify-start h-auto p-1">
                    <TabsTrigger value="about" className="data-[state=active]:bg-[#ff2e2e] data-[state=active]:text-white">Об игре</TabsTrigger>
                    <TabsTrigger value="media" className="data-[state=active]:bg-[#ff2e2e] data-[state=active]:text-white">Медиа</TabsTrigger>
                    <TabsTrigger value="reqs" className="data-[state=active]:bg-[#ff2e2e] data-[state=active]:text-white">Требования</TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="mt-6 space-y-8">
                    <p className="text-lg text-gray-300 leading-relaxed font-light">
                        {game.desc}
                    </p>

                    {/* How Long To Beat Block */}
                    <div className="bg-[#121212] rounded-xl border border-white/5 overflow-hidden">
                        <div className="px-6 py-3 border-b border-white/5 bg-white/5 flex items-center gap-2 font-bold text-white">
                            <Clock size={18} className="text-[#ff2e2e]" /> Время прохождения
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/5">
                            <StatBlock label="Сюжет" value="25ч" />
                            <StatBlock label="Сайды" value="42ч" />
                            <StatBlock label="100%" value="68ч" />
                            <div className="p-4 text-center bg-[#ff2e2e]/5">
                                <div className="text-2xl font-bold text-[#ff2e2e]">92%</div>
                                <div className="text-xs text-gray-500 uppercase mt-1">Рейтинг</div>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="media" className="mt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {game.screenshots.map((shot, i) => (
                            <div key={i} className="relative aspect-video rounded-lg overflow-hidden border border-white/10 group cursor-pointer bg-zinc-900">
                                <Image
                                    src={shot}
                                    alt="Screenshot"
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                            </div>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="reqs" className="mt-6">
                    <div className="bg-[#121212] p-6 rounded-xl border border-white/5 space-y-6">
                        <h3 className="font-bold text-white flex items-center gap-2">
                            <Cpu size={20} /> Системные требования (PC)
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                            <ReqsColumn title="Минимальные" color="text-[#ff2e2e]" specs={[
                                { k: "OS", v: "Windows 10" },
                                { k: "CPU", v: "Intel Core i7-6700" },
                                { k: "RAM", v: "12 GB" },
                                { k: "GPU", v: "GTX 1060 6GB" },
                            ]} />
                            <ReqsColumn title="Рекомендуемые" color="text-emerald-500" specs={[
                                { k: "OS", v: "Windows 10/11" },
                                { k: "CPU", v: "Intel Core i7-12700" },
                                { k: "RAM", v: "16 GB" },
                                { k: "GPU", v: "RTX 3080" },
                            ]} />
                        </div>
                    </div>
                </TabsContent>
            </Tabs>

            <Separator className="bg-white/10" />
            <div className="pt-4">
                <Reviews />
            </div>
        </div>
    )
}

// Sub-components to keep code clean
function StatBlock({ label, value }: { label: string, value: string }) {
    return (
        <div className="p-4 text-center">
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-xs text-gray-500 uppercase mt-1">{label}</div>
        </div>
    )
}

function ReqsColumn({ title, color, specs }: { title: string, color: string, specs: { k: string, v: string }[] }) {
    return (
        <div>
            <h4 className={`${color} font-bold mb-3 border-b border-current/30 pb-1 inline-block`}>{title}</h4>
            <ul className="space-y-3 text-gray-400">
                {specs.map((s, i) => (
                    <li key={i} className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-white font-medium">{s.k}:</span> {s.v}
                    </li>
                ))}
            </ul>
        </div>
    )
}