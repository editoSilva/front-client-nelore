import { create} from 'zustand';

import { TableQueries } from '@/@types/common';
import dayjs from 'dayjs';
import { apiGetUser, apiGetUsers, apiUpdateUser } from '@/services/admin/users/ApiUsers';
import { UserDetailResponse, UsersResponse} from '@/@types/admin/users/UsersTypes';

import { FormSchema } from '@/views/admin/users/deatils';

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

export type UserState = {
    tableData: TableQueries
    filterData: Filter
    isLoading: boolean
    users: UsersResponse
    user: UserDetailResponse
    isSubmitting: boolean
    message: string 
    isMessageSuccess: boolean
}

type UserAction = {
    setFilterData: (payload: Filter) => void
    setTableData: (payload: TableQueries) => void
    featchUsers: (payload: TableQueries, data: Filter, role: string | undefined) => void  
    featchUser: (payload: string | null ) => void
    featchUpdateUser: (payload: FormSchema) => void
}

const initialState: UserState = {
    tableData: initialTableData,
    filterData: initialFilterData,
    isLoading: true,
    isSubmitting: false,
    message: '',
    isMessageSuccess: false,
    user: {
        data: {
            id: '',
            name: '',
            email: '',
            phone: '',
            cpf: '',
            code: '',
            role: '',
            referrals: 0,
            wallet: {
                balance: 0,
                all_balance: 0, 
                balance_invest: 0, 
                balance_network: 0, 
                balance_withdrawl: 0, 
                all_withdrawl: 0,     
            }
        }
         
    },

    users: {
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



export const useStoreuser = create<UserState & UserAction >((set) => ({

        ...initialState,

        featchUsers: async (data, filter, role) => {

            set({
           
                isLoading: true,
            })

            const response = await apiGetUsers(data, filter, role);

            set({
                users: response,
                isLoading: false,
            })
        },
        featchUser: async (data) => {
            set({
           
                isLoading: true,
            })
            const response = await apiGetUser(data);

            set({
                isLoading: false,
                user: response
            })
        },
        featchUpdateUser: async (data) => {

            set({
                isLoading: true,
                isSubmitting: true
            })

            try {
                const response = await apiUpdateUser(data);

                set({
                    message: 'Atualizado Com sucesso',
                    isMessageSuccess: true,
                    isLoading: false,
                    isSubmitting: false
                })

            } catch (error) {
                console.log(error)

                set({
                    message: 'Erro ao atualizar',
                    isMessageSuccess: true,
                    isLoading: false,
                    isSubmitting: false
                })

            } finally {

              
                setTimeout(() => {
                    set({
                        isMessageSuccess: false
                    })
                }, 2000)
            }
          

          
        },
        setFilterData: (payload) => set(() => ({ filterData: payload })),
        setTableData: (payload) => set(() => ({ tableData: payload })),

}))








