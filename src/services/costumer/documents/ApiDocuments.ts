import ApiService from '@/services/ApiService';

import endpointConfig from '@/configs/costumer/endpointConfig';

export async function ApiPostDocument({ data }: { data: FormData; }) {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.sendDocuments,
        method: 'post',
        data,
    })
}