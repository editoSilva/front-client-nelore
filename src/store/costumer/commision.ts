import { create } from 'zustand';

import { TableQueries } from '@/@types/common';
import dayjs from 'dayjs';
import { CommissionResponse } from '@/@types/costumer/commission/CommissionTypes';
import { apiGetCommisions } from '@/services/costumer/commisions/ApiCommision';


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

export type CommisionListState = {
    tableData: TableQueries
    filterData: Filter
    isLoading: boolean
    commisions: CommissionResponse
}

type CommisionListAction = {
    setFilterData: (payload: Filter) => void
    setTableData: (payload: TableQueries) => void
    featchCommisions: (payload: TableQueries, data: Filter) => void
}

const initialState: CommisionListState= {
    tableData: initialTableData,
    filterData: initialFilterData,
    isLoading: true,

    commisions: {
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

export const useCommisionStore = create<CommisionListState & CommisionListAction>((set) => ({

    //States
    ...initialState,
    isLoading: true,
    featchCommisions: async (data, filter) => {
        const response = await apiGetCommisions(data, filter);
        set({commisions: response, isLoading:false})
    },
    
    setFilterData: (payload) => set(() => ({ filterData: payload })),
    setTableData: (payload) => set(() => ({ tableData: payload })),
  

}));

