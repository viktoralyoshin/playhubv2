import React from "react"
import Link from "next/link"
import { Zap, Github, Twitter, Youtube, Gamepad2 } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-[#020202] pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    {/* Колонка 1: Лого и инфо */}
                    <div className="col-span-1 md:col-span-1 space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="bg-[#ff2e2e] rounded-lg p-1.5 flex items-center justify-center text-white">
                                <Zap size={20} fill="currentColor" />
                            </div>
                            <span className="font-black text-xl text-white tracking-wide">PLAYHUB</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Ваш проводник в мир видеоигр. Обзоры, новости, гайды и самое дружелюбное комьюнити геймеров.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <SocialLink href="#" icon={<Twitter size={18} />} />
                            <SocialLink href="#" icon={<Youtube size={18} />} />
                            <SocialLink href="#" icon={<Github size={18} />} />
                            <SocialLink href="#" icon={<Gamepad2 size={18} />} />
                        </div>
                    </div>

                    {/* Колонка 2: Навигация */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Навигация</h3>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link href="#" className="hover:text-[#ff2e2e] transition-colors">Главная</Link></li>
                            <li><Link href="#" className="hover:text-[#ff2e2e] transition-colors">Каталог игр</Link></li>
                            <li><Link href="#" className="hover:text-[#ff2e2e] transition-colors">Новости</Link></li>
                            <li><Link href="#" className="hover:text-[#ff2e2e] transition-colors">Сообщество</Link></li>
                        </ul>
                    </div>

                    {/* Колонка 3: Помощь */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Помощь</h3>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link href="#" className="hover:text-[#ff2e2e] transition-colors">Поддержка</Link></li>
                            <li><Link href="#" className="hover:text-[#ff2e2e] transition-colors">FAQ</Link></li>
                            <li><Link href="#" className="hover:text-[#ff2e2e] transition-colors">Правила</Link></li>
                            <li><Link href="#" className="hover:text-[#ff2e2e] transition-colors">Контакты</Link></li>
                        </ul>
                    </div>

                    {/* Колонка 4: Юридическое */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Legal</h3>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link href="#" className="hover:text-[#ff2e2e] transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-[#ff2e2e] transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-[#ff2e2e] transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Копирайт */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-600 text-sm">
                        © 2024 PlayHub Inc. Все права защищены.
                    </p>
                    <div className="flex items-center gap-6">
                        <span className="text-gray-600 text-xs">Made with ❤️ for gamers</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

// Вспомогательный компонент для соц. иконок
function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <a
            href={href}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#ff2e2e] hover:text-white transition-all duration-300"
        >
            {icon}
        </a>
    )
}