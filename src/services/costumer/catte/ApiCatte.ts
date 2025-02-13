import ApiService from '@/services/ApiService'

import endpointConfig from '@/configs/costumer/endpointConfig'

import {CatteResponse, CatteShow} from '@/@types/costumer/catte/CattleType'

export async function apiGetCatte() {
    return ApiService.fetchDataWithAxios<CatteResponse>({
        url: endpointConfig.cattes,
        method: 'get',
    })
}


export async function apiGetCatteShow(data: string) {
    return ApiService.fetchDataWithAxios<CatteShow>({
        url: endpointConfig.catteshow+data,
        method: 'get',
    })
}
