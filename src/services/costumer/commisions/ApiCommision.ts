
import ApiService from '@/services/ApiService';
import endpointConfig from '@/configs/costumer/endpointConfig';
import { CommissionResponse } from '@/@types/costumer/commission/CommissionTypes';
import { TableQueries } from '@/@types/common';
import { Filter } from '@/store/costumer/transactions';


export async function apiGetCommisions(data: TableQueries, filter: Filter) {
    const {sort, pageSize, pageIndex, query} = data;
    const {date, status} = filter;
 
    const params  = {
        'created_at': sort?.order,
        'per_page':   pageSize,
        'page'    :   pageIndex,
        'name': query,
        'startDate':      date[0].toISOString().split('T')[0],
        'endDate':  date[1].toISOString().split('T')[0],
        'status': status 
    };  

    return ApiService.fetchDataWithAxios<CommissionResponse>({
        url: endpointConfig.commisions,
        method: 'get',
        params,
    })
}