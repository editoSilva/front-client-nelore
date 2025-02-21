import ApiService from '@/services/ApiService';

import endpointConfig from '@/configs/costumer/endpointConfig';

import { InvestmentResponse } from '@/@types/costumer/investiment/InvestMentTypes';

export async function apiGetInvestiment() {
    return ApiService.fetchDataWithAxios<InvestmentResponse>({
        url: endpointConfig.listInvestments,
        method: 'get',
    })
}