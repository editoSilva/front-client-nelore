export type UsersResponse = {
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

export type UserType = {
    id: string
    name: string
    email: string
    phone: string
    cpf: string
    code: string
    role: string
    referrals: number
    wallet: Wallet
}



export type UserDetailResponse = {
    data: {
        id: string
        name: string
        email: string
        phone: string
        cpf: string
        code: string
        role: string
        referrals: number
        wallet: Wallet
    }
}

export type Wallet = {
        balance: number
        all_balance: number 
        balance_invest: number 
        balance_network: number 
        balance_withdrawl: number 
        all_withdrawl: number
}