"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion" // Импорт motion
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Loader2, Github, Gamepad2 } from "lucide-react"

export function AuthForm() {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [activeTab, setActiveTab] = React.useState("login") // Следим за табом

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }

    // Параметры анимации для контента табов
    const tabVariants = {
        hidden: { opacity: 0, x: 0, y: 10, scale: 0.98 },
        visible: { opacity: 1, x: 0, y: 0, scale: 1 },
        exit: { opacity: 0, x: 0, y: -10, scale: 0.98 },
    }

    return (
        <div className="grid gap-6">
            <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">

                <TabsList className="grid w-full grid-cols-2 bg-[#1a1a1a] text-gray-400">
                    <TabsTrigger value="login" className="data-[state=active]:bg-[#ff2e2e] data-[state=active]:text-white transition-all">
                        Войти
                    </TabsTrigger>
                    <TabsTrigger value="register" className="data-[state=active]:bg-[#ff2e2e] data-[state=active]:text-white transition-all">
                        Регистрация
                    </TabsTrigger>
                </TabsList>

                {/* Обертка для плавного изменения высоты контейнера при переключении */}
                <div className="overflow-hidden mt-4">
                    <AnimatePresence mode="wait">
                        {activeTab === "login" ? (
                            <motion.div
                                key="login"
                                variants={tabVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ duration: 0.2 }}
                            >
                                <TabsContent value="login" className="mt-0 space-y-4">
                                    {/* ... ВЕСЬ КОД ФОРМЫ ВХОДА ИЗ ПРОШЛОГО ОТВЕТА ... */}
                                    <form onSubmit={onSubmit}>
                                        <div className="grid gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="email" className="text-gray-300">Email</Label>
                                                <Input id="email" type="email" disabled={isLoading} className="bg-[#121212] border-white/10 text-white focus-visible:ring-[#ff2e2e]" />
                                            </div>
                                            <div className="grid gap-2">
                                                <div className="flex items-center justify-between">
                                                    <Label htmlFor="password" className="text-gray-300">Пароль</Label>
                                                    <a href="#" className="text-xs text-[#ff2e2e] hover:underline">Забыли пароль?</a>
                                                </div>
                                                <Input id="password" type="password" disabled={isLoading} className="bg-[#121212] border-white/10 text-white focus-visible:ring-[#ff2e2e]" />
                                            </div>
                                            <Button disabled={isLoading} className="bg-white text-black hover:bg-gray-200 font-bold mt-2">
                                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                Войти в аккаунт
                                            </Button>
                                        </div>
                                    </form>
                                </TabsContent>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="register"
                                variants={tabVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ duration: 0.2 }}
                            >
                                <TabsContent value="register" className="mt-0 space-y-4">
                                    {/* ... ВЕСЬ КОД ФОРМЫ РЕГИСТРАЦИИ ИЗ ПРОШЛОГО ОТВЕТА ... */}
                                    <form onSubmit={onSubmit}>
                                        <div className="grid gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="username" className="text-gray-300">Никнейм</Label>
                                                <Input id="username" type="text" disabled={isLoading} className="bg-[#121212] border-white/10 text-white focus-visible:ring-[#ff2e2e]" />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="reg-email" className="text-gray-300">Email</Label>
                                                <Input id="reg-email" type="email" disabled={isLoading} className="bg-[#121212] border-white/10 text-white focus-visible:ring-[#ff2e2e]" />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="reg-password" className="text-gray-300">Пароль</Label>
                                                <Input id="reg-password" type="password" disabled={isLoading} className="bg-[#121212] border-white/10 text-white focus-visible:ring-[#ff2e2e]" />
                                            </div>
                                            <Button disabled={isLoading} className="bg-[#ff2e2e] hover:bg-[#d61e1e] text-white font-bold mt-2">
                                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                Создать аккаунт
                                            </Button>
                                        </div>
                                    </form>
                                    <p className="text-xs text-center text-gray-500">
                                        Нажимая кнопку, вы соглашаетесь с нашими <a href="#" className="underline hover:text-white">Условиями использования</a>.
                                    </p>
                                </TabsContent>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </Tabs>

            {/* Остальная часть (соц сети) без изменений... */}
            <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                    <Separator className="bg-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[#050505] px-2 text-gray-500">или через</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" disabled={isLoading} className="border-white/10 text-white hover:bg-white/10 hover:text-white bg-[#121212]">
                    <Github className="mr-2 h-4 w-4" />
                    Github
                </Button>
                <Button variant="outline" disabled={isLoading} className="border-white/10 text-white hover:bg-white/10 hover:text-white bg-[#121212]">
                    <Gamepad2 className="mr-2 h-4 w-4" />
                    Discord
                </Button>
            </div>
        </div>
    )
}