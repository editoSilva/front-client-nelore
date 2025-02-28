import { create } from 'zustand';
import { apiGetTransactions, apiGetTransactionWithDrawal, ApiPostDeposit, ApiPostStatusDeposit, ApiPostWithdrwal } from '@/services/costumer/transaction/ApiTransaction';
import { DepositResponse, DepositType, StatusDepositType, TransactionsResponse, WithDrawalResponse, WithdrawalType } from '@/@types/costumer/transaction/TransactionTypes';
import { TableQueries } from '@/@types/common';
import dayjs from 'dayjs';


export type Filter = {
    date: [Date, Date]
    status: string
}



export const DepositInitial: DepositType = {
       amount: '0.0'
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


export type TransactionListState = {
    tableData: TableQueries
    message: string
    statusWithDrawal: boolean
    errorWithDrawal: boolean
    filterData: Filter
    isLoading: boolean
    transactions: TransactionsResponse
    deposit: DepositResponse
    isDeposit: boolean
    statusDepoist: {
        status: string
    }
}


type TransactionListAction = {
    setFilterData: (payload: Filter) => void
    setTableData: (payload: TableQueries) => void
    featchTransactions: (payload: TableQueries, data: Filter) => void
    feathTransactionsWithDrawal: (payload: TableQueries, data: Filter) => void
    featchDeposit:  (payload: DepositType) => void
    resetDeposit:   () => void
    featchStatusDeposit: (payload: StatusDepositType) => void
    featchWithdrawal: (payload: WithdrawalType) => void
}

const initialState: TransactionListState = {
    tableData: initialTableData,
    filterData: initialFilterData,
    isLoading: true,
    isDeposit: false,
    statusWithDrawal: false,
    errorWithDrawal: false,
    message: '',
    statusDepoist: {
        status: 'pending'
    },
    deposit: {
        data: {
            transaction_id: '',
            success: false,
            content: '',
            base_64: ''
        }
          
      
    },
    transactions: {
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

export const useTransactionStore = create<TransactionListState & TransactionListAction>((set) => ({

    //States
    ...initialState,
    isLoading: true,
    featchTransactions: async (data, filter) => {
        const response = await apiGetTransactions(data, filter);
        set({transactions: response, isLoading:false})
    },
    feathTransactionsWithDrawal: async (data, filter) => {
        const response = await apiGetTransactionWithDrawal(data, filter);
        set({transactions: response, isLoading:false})
    },
    featchDeposit: async(data) => {
            const response = await ApiPostDeposit(data);     
            console.log('depositooo', response)       
            set({deposit: response})
    },
    featchStatusDeposit: async (data) => {
        const response = await ApiPostStatusDeposit(data);
        console.log('res', response)
        set({statusDepoist: response})
    },
    setFilterData: (payload) => set(() => ({ filterData: payload })),
    setTableData: (payload) => set(() => ({ tableData: payload })),
    resetDeposit: () => {
        set({deposit: initialState.deposit, isDeposit: false})
    },
    //Saque
    featchWithdrawal: async (data) => {
        set({
            isLoading: true
        })
        try {
            const response = await ApiPostWithdrwal(data);
            if(response.data.success) {
                set({
                    statusWithDrawal: true,
                    errorWithDrawal: false,
                    message: response.data?.message || "Operação realizada com sucesso.",
                    isLoading: false,
                });
            } else {
                set({
                    statusWithDrawal: false,
                    errorWithDrawal: true,
                    message: response.data?.message || "Operação realizada com sucesso.",
                    isLoading: false,
                });
            }
            
    
        } catch (error) {
            console.log('eerros', error)
            
           set({
                isLoading: false,
            }); 
        } finally {
           console.log('fim')
           setTimeout(() => {
            set({
                statusWithDrawal: false,
                errorWithDrawal: false,
                message: "",
            });
        }, 2000);
        }
    }

}));

function apiGetTransactionsWithDrawal(data: TableQueries, filter: Filter) {
    throw new Error('Function not implemented.');
}

