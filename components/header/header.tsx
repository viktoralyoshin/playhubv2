"use client"

import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Zap } from "lucide-react"

const Header = () => {

    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navLinks = [
        { name: "Все игры", href: "/" },
    ]

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent",
                // Стили при скролле: темный фон, блюр, бордер
                isScrolled
                    ? "bg-[#0a0a0a]/90 backdrop-blur-md py-3 border-white/10 shadow-lg"
                    : "bg-transparent py-5"
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Логотип */}
                <Link href="/" className="flex items-center gap-2 group">
                    {/* Красная иконка */}
                    <div className="bg-[#ff2e2e] rounded-lg p-1.5 flex items-center justify-center text-white transition-transform group-hover:scale-105">
                        <Zap size={20} fill="currentColor" />
                    </div>
                    {/* Текст логотипа */}
                    <div className="flex items-baseline text-xl">
                        <span className="font-black text-white tracking-wide">PLAYHUB</span>
                    </div>
                </Link>

                {/* Навигация и Кнопка */}
                <div className="flex items-center gap-8">
                    {/* Ссылки (скрываем на мобильных для простоты примера) */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Кнопка входа */}
                    <Button
                        variant="default"
                        className="bg-[#ff2e2e] hover:bg-[#d61e1e] text-white font-semibold rounded-full px-6"
                    >
                        Войти
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default Header