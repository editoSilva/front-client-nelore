// Interfaces para os dados
export type YieldHistory = {
    yield: number
    total_investment: number
    yield_date: string
    rate: number
  }
  
  export type  Investment =  {
    type: string
    investment_code: string
    shares_acquired: number
    total_invested: string
    return_percentage: string
    total_redeem: string
    redeem_date: string | null
    profit_total: string | null
    membership_fee: string
    rate: string
    days: string
    created_at: string
    update_at: string
    rate_withdrawl: number
    yieldHistories: YieldHistory[]
  }


  export type YieldHistories = {
      yield: number,
      total_investment: number
      yield_date: string
      rate: number
  }
  
  export type  InvestmentsData = {
    data: Investment[]
    links: {
      first: string
      last: string
      prev: string | null
      next: string | null
    }
    meta: {
      current_page: number
      from: number
      last_page: number
      links: {
        url: string | null
        label: string
        active: boolean
      }[]
      path: string
      per_page: number
      to: number
      total: number
    }
  }


  export type InvestmentResponse = {
    
    data: [],
        links: '',
        meta: {
            current_page: 11,
            from: 1,
            last_page: 1,
            links: [],
            path: '',
            per_page: 10,
            to: 1,
            total: 0,

        }

       
}