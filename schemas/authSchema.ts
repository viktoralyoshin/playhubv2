import * as z from "zod"

export const loginSchema = z.object({
    login: z.string().min(2, "Минимум 2 символа"),
    password: z.string().min(6, "Пароль слишком короткий"),
})

export const registerSchema = z.object({
    username: z.string().min(3, "Минимум 3 символа"),
    email: z.string().email("Некорректный email"),
    password: z.string().min(6, "Минимум 6 символов"),
})