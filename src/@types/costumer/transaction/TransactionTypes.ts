export type TransactionsTypes = {

    transaction_id: string,
    content: string,
    transaction_type: string,
    withdrawal_fee: number,
    amount: number,
    balance_before: number,
    balance_after: number,
    status: string,
    created_at: string,
    updated_at: string,
    paymented_at: string

}
export type  DepositResponse = {
    data: {
        transaction_id: string,
        success: boolean,
        content: string,
        base_64: string
    }
}

export type DepositType = {
    amount: string
}

export type StatusDepositType = {
    transaction_id: string
}

export type StatusDepositResponse = {
    status: string
}
export type TransactionsResponse = {
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