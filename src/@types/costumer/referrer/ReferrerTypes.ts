export type ReferrerResponse = {
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

export type LinkTypes = {
    code: string
}

export type ReferrerTypes = {
    name: string
    email: string
    status: string
    phone: string
    cpf:string
    created_at: string
}