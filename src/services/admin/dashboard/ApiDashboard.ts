import ApiService from '@/services/ApiService'

import endpointConfig from '@/configs/admin/endpointConfig'
import { CardTop } from '@/@types/admin/dashboard/DashboardTypes'

export async function apiGetDashboard() {
    return ApiService.fetchDataWithAxios<CardTop>({
        url: endpointConfig.dashboard,
        method: 'get',
    })
}

