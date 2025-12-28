"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Zap, User, LogOut, Settings, LayoutDashboard } from "lucide-react"

import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { authService } from "@/services/auth.service"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuthStore } from "@/store/auth.store"

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mounted, setMounted] = useState(false)

    const { isAuth, user, logout } = useAuthStore()
    const router = useRouter()

    useEffect(() => {
        setMounted(true)
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleLogout = async () => {
        try {
            await authService.logout()
            logout()
            router.push("/auth")
        } catch (error) {
            console.error("Ошибка при выходе", error)
            logout()
        }
    }

    const navLinks = [
        { name: "Все игры", href: "/games" },
    ]

    const authContent = !mounted ? null : isAuth && user ? (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer group">
                    <div className="flex flex-col items-end hidden sm:flex">
                        <span className="text-sm font-bold text-white group-hover:text-[#ff2e2e] transition-colors">
                            {user.username}
                        </span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest">
                            {user.role}
                        </span>
                    </div>
                    <Avatar className="h-9 w-9 border border-white/10 group-hover:border-[#ff2e2e] transition-all">
                        <AvatarFallback className="bg-[#1a1a1a] text-white text-xs uppercase">
                            {user.username.slice(0, 2)}
                        </AvatarFallback>
                    </Avatar>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-[#0a0a0a] border-white/10 text-white" align="end">
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.username}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem asChild className="focus:bg-white/5 cursor-pointer">
                    <Link href="/profile" className="flex w-full items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Профиль</span>
                    </Link>
                </DropdownMenuItem>
                {user.role === 'admin' && (
                    <DropdownMenuItem asChild className="focus:bg-white/5 cursor-pointer text-[#ff2e2e]">
                        <Link href="/admin" className="flex w-full items-center">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            <span>Админ-панель</span>
                        </Link>
                    </DropdownMenuItem>
                )}
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem
                    onClick={handleLogout}
                    className="focus:bg-red-500/10 text-red-500 cursor-pointer focus:text-red-500"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Выйти</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    ) : (
        <Button
            asChild
            variant="default"
            className="bg-[#ff2e2e] hover:bg-[#d61e1e] text-white font-semibold rounded-full px-6 transition-all"
        >
            <Link href="/auth">Войти</Link>
        </Button>
    )

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b",
                isScrolled
                    ? "bg-[#0a0a0a]/90 backdrop-blur-md py-3 border-white/10 shadow-lg"
                    : "bg-transparent py-5 border-transparent"
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-[#ff2e2e] rounded-lg p-1.5 flex items-center justify-center text-white transition-transform group-hover:scale-105">
                        <Zap size={20} fill="currentColor" />
                    </div>
                    <div className="flex items-baseline text-xl">
                        <span className="font-black text-white tracking-wide">PLAYHUB</span>
                    </div>
                </Link>
                <div className="flex items-center gap-8">
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
                    {authContent}
                </div>
            </div>
        </header>
    )
}

export default Header