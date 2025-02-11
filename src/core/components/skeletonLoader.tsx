import { Card, Skeleton } from "@heroui/react"

export const SkeletonLoader = () => {
    return (
        <Card className="p-4 w-1/4" radius="lg">
            <Skeleton className="w-2/5 mb-3 rounded-lg">
                <div className="h-3 w-2/5 rounded-lg bg-default-300" />
            </Skeleton>
            <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-default-300" />
            </Skeleton>
        </Card>
    )
}