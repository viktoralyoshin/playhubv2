import React from "react"
import Link from "next/link"
import { Zap, Gamepad2 } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-[#020202] pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1 space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="bg-[#ff2e2e] rounded-lg p-1.5 flex items-center justify-center text-white">
                                <Zap size={20} fill="currentColor" />
                            </div>
                            <span className="font-black text-xl text-white tracking-wide">PLAYHUB</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Ваш проводник в мир видеоигр.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}