import ApiService from '@/services/ApiService'

import endpointConfig from '@/configs/costumer/endpointConfig'

export async function apiGetDashboard() {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.dashboard,
        method: 'get',
    })
}


