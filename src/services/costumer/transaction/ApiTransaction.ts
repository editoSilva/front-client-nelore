import ApiService from '@/services/ApiService'
import { DepositResponse, DepositType, StatusDepositResponse, StatusDepositType, TransactionsResponse, WithDrawalResponse, WithdrawalType } from '@/@types/costumer/transaction/TransactionTypes'

import endpointConfig from '@/configs/costumer/endpointConfig'
import { TableQueries } from '@/@types/common'
import { Filter } from '@/store/costumer/transactions';


export async function apiGetTransactions(data: TableQueries, filter: Filter) {
    const {sort, pageSize, pageIndex, query} = data;
    const {date, status} = filter;
    console.log('filtrando', date[0].toISOString().split('T')[0])

    const params  = {
        'created_at': sort?.order,
        'per_page':   pageSize,
        'page'    :   pageIndex,
        'transaction_id': query,
        'startDate':      date[0].toISOString().split('T')[0],
        'endDate':  date[1].toISOString().split('T')[0],
        'status': status 
    };  

    return ApiService.fetchDataWithAxios<TransactionsResponse>({
        url: endpointConfig.transactions,
        method: 'get',
        params,
    })
}


export async function ApiPostDeposit(data: DepositType) {
    return ApiService.fetchDataWithAxios<DepositResponse>({
        url: endpointConfig.deposit,
        method: 'post',
        data,
    })
}

export async function ApiPostStatusDeposit(data: StatusDepositType) {
    return ApiService.fetchDataWithAxios<StatusDepositResponse>({
        url: endpointConfig.depositStatus,
        method: 'post',
        data,
    })
}

export async function ApiPostWithdrwal(data: WithdrawalType) {
    return ApiService.fetchDataWithAxios<WithDrawalResponse>({
        url: endpointConfig.withdrawal,
        method: 'post',
        data,
    })
}
