"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

import { ISignIn, ISignUp } from "@/types/user.types"
import { useAuthMutations } from "@/hooks/useAuth"
import { loginSchema, registerSchema } from "@/schemas/authSchema"

const tabVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.98 },
}

export default function AuthForm() {
    const [activeTab, setActiveTab] = useState("login")
    const { loginMutation, registerMutation } = useAuthMutations()

    const isLoading = loginMutation.isPending || registerMutation.isPending

    const loginForm = useForm<ISignIn>({
        resolver: zodResolver(loginSchema),
        defaultValues: { login: "", password: "" },
    })

    const registerForm = useForm<ISignUp>({
        resolver: zodResolver(registerSchema),
        defaultValues: { username: "", email: "", password: "" },
    })

    const onLoginSubmit = (data: ISignIn) => loginMutation.mutate(data)
    const onRegisterSubmit = (data: ISignUp) => registerMutation.mutate(data)

    return (
        <div className="grid gap-6 mx-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-[#1a1a1a] text-gray-400">
                    <TabsTrigger value="login" className="data-[state=active]:bg-[#ff2e2e] data-[state=active]:text-white transition-all">
                        Войти
                    </TabsTrigger>
                    <TabsTrigger value="register" className="data-[state=active]:bg-[#ff2e2e] data-[state=active]:text-white transition-all">
                        Регистрация
                    </TabsTrigger>
                </TabsList>

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
                                <Form {...loginForm}>
                                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                                        <FormField
                                            control={loginForm.control}
                                            name="login"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-300">Email или Логин</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            disabled={isLoading}
                                                            className="bg-[#121212] border-white/10 text-white focus-visible:ring-[#ff2e2e]"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={loginForm.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex items-center justify-between">
                                                        <FormLabel className="text-gray-300">Пароль</FormLabel>
                                                        <a href="#" className="text-xs text-[#ff2e2e] hover:underline">Забыли?</a>
                                                    </div>
                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            {...field}
                                                            disabled={isLoading}
                                                            className="bg-[#121212] border-white/10 text-white focus-visible:ring-[#ff2e2e]"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit" disabled={isLoading} className="w-full bg-white text-black hover:bg-gray-200 font-bold mt-2">
                                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Войти в аккаунт
                                        </Button>
                                    </form>
                                </Form>
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
                                <Form {...registerForm}>
                                    <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                                        <FormField
                                            control={registerForm.control}
                                            name="username"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-300">Никнейм</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} disabled={isLoading} className="bg-[#121212] border-white/10 text-white focus-visible:ring-[#ff2e2e]" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={registerForm.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-300">Email</FormLabel>
                                                    <FormControl>
                                                        <Input type="email" {...field} disabled={isLoading} className="bg-[#121212] border-white/10 text-white focus-visible:ring-[#ff2e2e]" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={registerForm.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-300">Пароль</FormLabel>
                                                    <FormControl>
                                                        <Input type="password" {...field} disabled={isLoading} className="bg-[#121212] border-white/10 text-white focus-visible:ring-[#ff2e2e]" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit" disabled={isLoading} className="w-full bg-[#ff2e2e] hover:bg-[#d61e1e] text-white font-bold mt-2">
                                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Создать аккаунт
                                        </Button>
                                    </form>
                                </Form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </Tabs>
        </div>
    )
}