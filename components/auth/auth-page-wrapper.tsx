"use client"

import React from "react"
import { motion } from "framer-motion"
import AuthForm from "./auth-form"

export function AuthPageWrapper() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="flex flex-col space-y-2 text-center mb-6">
                <h1 className="text-2xl font-semibold tracking-tight text-white">
                    Добро пожаловать
                </h1>
                <p className="text-sm text-gray-400">
                    Войдите в систему, чтобы управлять библиотекой и оценивать игры
                </p>
            </div>

            <AuthForm />
        </motion.div>
    )
}