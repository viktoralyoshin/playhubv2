import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUserById } from "@/hooks/useUser"
import { IReview } from "@/types/social.types"
import { formatDistanceToNow } from "date-fns"
import { ru } from "date-fns/locale"
import { Quote } from "lucide-react"
import { cn } from "@/lib/utils"

const getRatingStyle = (score: number) => {
    if (score >= 90) return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
    if (score >= 70) return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20"
    if (score >= 50) return "text-orange-500 bg-orange-500/10 border-orange-500/20"
    return "text-red-500 bg-red-500/10 border-red-500/20"
}

export function ReviewCard({ review }: { review: IReview }) {
    const { data: user, isLoading } = useUserById(review.user_id)

    return (
        <div className="bg-white/5 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors">
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                    <Avatar className="w-10 h-10 border border-white/10">
                        <AvatarImage src={`https://api.dicebear.com/7.x/identicon/svg?seed=${review.user_id}`} />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div>
                        <h4 className="text-white font-bold leading-none mb-1">
                            {isLoading ? "Загрузка..." : user?.username || "Игрок"}
                        </h4>
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest">
                            {formatDistanceToNow(new Date(review.created_at), { addSuffix: true, locale: ru })}
                        </span>
                    </div>
                </div>

                <div className={cn(
                    "w-12 h-12 rounded-xl border flex items-center justify-center font-black text-lg",
                    getRatingStyle(review.rating)
                )}>
                    {review.rating}
                </div>
            </div>

            <div className="relative">
                <Quote className="absolute -top-1 -left-1 w-4 h-4 text-gray-700 rotate-180" />
                <p className="text-gray-300 leading-relaxed pl-5 italic">
                    {review.text}
                </p>
            </div>
        </div>
    )
}