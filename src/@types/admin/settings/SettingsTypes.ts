

export type SettingsType = {
        id: string,
        withdrawal_invest_days: number,
        withdrawal_fee: number,
        max_invested_capital_percentage: number,
        membership_fee: number,
        min_withdrawal: number,
        max_withdrawal: number
}

export type SettingsResponse = {
        data: {
                id: string,
                withdrawal_invest_days: number,
                withdrawal_fee: number,
                max_invested_capital_percentage: number,
                membership_fee: number,
                min_withdrawal: number,
                max_withdrawal: number 
        }
}