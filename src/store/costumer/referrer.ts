import { create } from 'zustand';

import { TableQueries } from '@/@types/common';
import dayjs from 'dayjs';
import { LinkTypes, ReferrerResponse } from '@/@types/costumer/referrer/ReferrerTypes';
import { apiGetReferrers, apiSetCountLink } from '@/services/costumer/referrer/ApiReferrer';


export type Filter = {
    date: [Date, Date]
    status: string
}



export const initialTableData: TableQueries = {
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: 'desc',
        key: 'created_at',
    },
}

export const initialFilterData = {
    date: [dayjs().subtract(1, 'week').toDate(), new Date()] as [Date, Date],
    status: 'all',

}


export type ReferrerListState = {
    tableData: TableQueries
    filterData: Filter
    isLoading: boolean
    referres: ReferrerResponse
  
}


type ReferrerListAction = {
    setFilterData: (payload: Filter) => void
    setTableData: (payload: TableQueries) => void
    featchReferrers: (payload: TableQueries, data: Filter) => void
    setCountLink: (payload : LinkTypes) => void
  
}

const initialState: ReferrerListState= {
    tableData: initialTableData,
    filterData: initialFilterData,
    isLoading: true,

    referres: {
        data: [],
        links: '',
        meta: {
            current_page: 1,
            total: 0,
            from: 1,
            patth: '',
            per_page: 0,
            to: 0,
            
        }
    },
}

export const useReferrerStore = create<ReferrerListState & ReferrerListAction>((set) => ({

    //States
    ...initialState,
    isLoading: true,
    featchReferrers: async (data, filter) => {
        const response = await apiGetReferrers(data, filter);
        console.log('response', response)
        set({referres: response, isLoading:false})
    },
    setCountLink: async (data) => {
        const response = await apiSetCountLink(data);
        console.log(response)      
    },
    setFilterData: (payload) => set(() => ({ filterData: payload })),
    setTableData: (payload) => set(() => ({ tableData: payload })),
  

}));

