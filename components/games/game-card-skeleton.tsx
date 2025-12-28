import { Skeleton } from "@/components/ui/skeleton"

export function GameCardSkeleton() {
    return (
        <div className="space-y-3">
            <Skeleton className="aspect-[2/3] w-full rounded-xl bg-white/5" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-3/4 bg-white/5" />
                <div className="flex justify-between">
                    <Skeleton className="h-3 w-1/4 bg-white/5" />
                    <Skeleton className="h-3 w-1/4 bg-white/5" />
                </div>
            </div>
        </div>
    )
}