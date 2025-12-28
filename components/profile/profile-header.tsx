"use client"

import React from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Link as LinkIcon } from "lucide-react"
import { motion } from "framer-motion"
import { IUser } from "@/types/user.types"

interface ProfileHeaderProps {
    user: IUser & {
        avatar: string;
        joined: string;
        bio?: string;
        location?: string;
        website?: string;
        level?: number;
        banner?: string;
    }
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
    return (
        <div className="relative mb-8">
            <div className="relative h-48 md:h-64 w-full rounded-b-3xl overflow-hidden bg-zinc-900">
                <img src="hero.jpg" alt="Banner" className="object-cover opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
            </div>

            <div className="container mx-auto px-4">
                <div className="relative -mt-16 flex flex-col md:flex-row items-center md:items-end gap-6">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative h-32 w-32 rounded-3xl overflow-hidden border-[6px] border-[#050505] bg-[#121212] shadow-2xl"
                    >
                        <Image src={user.avatar} alt={user.username} unoptimized fill className="object-cover" />
                    </motion.div>

                    <div className="flex-1 text-center md:text-left pb-2">
                        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                            <h1 className="text-3xl font-black text-white">{user.username}</h1>
                            <Badge className="w-fit mx-auto md:mx-0 bg-[#ff2e2e]/10 text-[#ff2e2e] border-[#ff2e2e]/20">
                                {user.role}
                            </Badge>
                        </div>

                        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs text-zinc-500 font-bold uppercase tracking-wider">
                            <div className="flex items-center gap-1.5"><Calendar size={14} /> На PlayHub с {user.joined}</div>
                            {user.location && <div className="flex items-center gap-1.5"><MapPin size={14} /> {user.location}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}