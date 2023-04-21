interface IComment {
    id: number,
    content: string,
    createdAt: string,
    score: number,
    user: {
        image: {
            png: string,
            webp: string
        },
        username: string
    },
    replyingTo?: string,
    replies: IComment[]
}

export type { IComment }
