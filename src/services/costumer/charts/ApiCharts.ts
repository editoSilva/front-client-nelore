import ApiService from '@/services/ApiService';

import endpointConfig from '@/configs/costumer/endpointConfig';

import { CattleWeight, InvestChart } from '@/@types/costumer/charts/ChartsTypes';

export async function apiGetChatCattleWigt() {
    return ApiService.fetchDataWithAxios<CattleWeight>({
        url: endpointConfig.chatCattleWigt,
        method: 'get',
    })
}

export async function apiGetChatInvestment() {
    return ApiService.fetchDataWithAxios<InvestChart>({
        url: endpointConfig.investmentChart,
        method: 'get',
    })
}