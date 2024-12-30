import ApiService from '@/services/ApiService'
import { TransactionsResponse } from '@/@types/costumer/transaction/TransactionTypes'

import endpointConfig from '@/configs/costumer/endpointConfig'

export async function apiGetTransactions() {
    return ApiService.fetchDataWithAxios<TransactionsResponse>({
        url: endpointConfig.transactions,
        method: 'get',
    })
}


