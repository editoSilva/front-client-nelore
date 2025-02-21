import ApiService from '@/services/ApiService';

import endpointConfig from '@/configs/costumer/endpointConfig';
import { PerfilTypes } from '@/@types/costumer/perfil/PerfilTypes';


export async function apiGetPerfil() {
    return ApiService.fetchDataWithAxios<PerfilTypes>({
        url: endpointConfig.perfil,
        method: 'get',
    
    })
}
