import ApiService from '@/services/ApiService'

import endpointConfig from '@/configs/admin/endpointConfig'
import { TableQueries } from '@/@types/common';
import { Filter } from '@/store/admin/users';
import { UserDetailResponse, UsersResponse} from '@/@types/admin/users/UsersTypes';
import { FormSchema } from '@/views/admin/users/deatils';

export async function apiGetUsers(data: TableQueries, filter: Filter, role: string | undefined) {
    const {sort, pageSize, pageIndex, query} = data;
    const { date } = filter;

    const params  = {
        'created_at': sort?.order,
        'per_page':   pageSize,
        'page'    :   pageIndex,
        'name'      : query,
        'startDate':      date[0].toISOString().split('T')[0],
        'endDate':  date[1].toISOString().split('T')[0],
        'role': role 
    };  

    return ApiService.fetchDataWithAxios<UsersResponse>({
        url: endpointConfig.users,
        method: 'get',
        params,
    })
}

export async function apiGetUser(data: string | null) {
    return ApiService.fetchDataWithAxios<UserDetailResponse>({
        url: endpointConfig.users+'/'+data,
        method: 'get',

    })
}

export async function apiUpdateUser(data: FormSchema ) {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.users+'/'+data.id,
        method: 'put',
        data

    })
}

