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

export type TransactionsResponse = {
    data: number[]
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