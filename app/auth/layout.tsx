import React from "react"
import Link from "next/link"
import { AuthBanner } from "@/components/auth/auth-banner" // Импорт

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 bg-[#050505] text-white overflow-hidden">
            {/* Кнопка "На главную" */}
            <Link
                href="/"
                className="absolute right-4 top-4 md:right-8 md:top-8 z-50 text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
                На главную
            </Link>

            {/* ЛЕВАЯ ЧАСТЬ: Вынесли в отдельный компонент для анимации */}
            <AuthBanner />

            {/* ПРАВАЯ ЧАСТЬ: Форма */}
            <div className="lg:p-8 relative z-10 bg-[#050505] h-full flex items-center">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    {children}
                </div>
            </div>
        </div>
    )
}