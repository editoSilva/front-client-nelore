import { create } from 'zustand';
import { apiGetTransactions } from '@/services/costumer/transaction/ApiTransaction';
import { TransactionsResponse } from '@/@types/costumer/transaction/TransactionTypes';

type TransactionStore = {
    transactions: TransactionsResponse
    isLoading: boolean

    featchTransactions: () => void
}

export const useTransactionStore = create<TransactionStore>((set) => ({

    //States
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
    isLoading: true,
    
    featchTransactions: async () => {
        const response = await apiGetTransactions();
        set({transactions: response, isLoading:false})
    }

}));

