import { Metadata } from "next"
import { AuthPageWrapper } from "@/components/auth/auth-page-wrapper" // Импорт

export const metadata: Metadata = {
    title: "Вход | PlayHub",
    description: "Войдите в свой аккаунт PlayHub для управления библиотекой игр.",
}

export default function AuthenticationPage() {
    return (
        <AuthPageWrapper />
    )
}