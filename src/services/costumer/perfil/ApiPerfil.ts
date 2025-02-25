import ApiService from '@/services/ApiService';
import endpointConfig from '@/configs/costumer/endpointConfig';
import { Adress, PerfilTypes, PixKey } from '@/@types/costumer/perfil/PerfilTypes';



export async function apiGetPerfil() {
    return ApiService.fetchDataWithAxios<PerfilTypes>({
        url: endpointConfig.perfil,
        method: 'post',
    })
}

export async function ApiPostSendPix(data: PixKey) {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.sendPix,
        method: 'post',
        data,
    })
}

export async function ApiPostSendAddress(data: Adress) {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.sendAddress,
        method: 'post',
        data,
    })
}