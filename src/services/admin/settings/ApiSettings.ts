import ApiService from '@/services/ApiService'

import endpointConfig from '@/configs/admin/endpointConfig'
import { SettingsResponse, SettingsType } from '@/@types/admin/settings/SettingsTypes'


export async function apiGetSettings() {
    return ApiService.fetchDataWithAxios<SettingsResponse>({
        url: endpointConfig.settings,
        method: 'get',
    })
}

export async function apiUpdateSettings(data: SettingsType) {
    return ApiService.fetchDataWithAxios<SettingsResponse>({
        url: endpointConfig.settings+'/'+data.id,
        method: 'put',
        data
    })
}
