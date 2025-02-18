export type Commission = {
    user: string
    description: string
    created_at: string
    amount: number
}

export type CommissionResponse = {
    data: []
    links: string
    meta: {
        current_page: number
        total: number
        from: number,
        patth: string,
        per_page: number,
        to: number,
        
    }
}