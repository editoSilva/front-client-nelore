import { create } from "zustand";

import { apiGetInvestiment } from '@/services/costumer/investments/ApiInvestiment';
import { InvestmentResponse } from "@/@types/costumer/investiment/InvestMentTypes";

interface InvestmentState  {
    isLoading: boolean
    investment: InvestmentResponse
  
}

interface InvestmentActions {
    isLoading: boolean
    fetchInvestments: () => Promise<void>;
}


const initialState : InvestmentState = {
        isLoading: true,
        investment: {
            data: [],
            links: '',
            meta: {
                current_page: 11,
                from: 1,
                last_page: 1,
                links: [],
                path: '',
                per_page: 10,
                to: 1,
                total: 0,
            }
        }
        
}

export const useInvestmentStore = create<InvestmentState & InvestmentActions>((set) => ({

    ...initialState,
    isLoading: false,
    fetchInvestments: async () => {

        set({ isLoading: true});
          try {
                    const response = await apiGetInvestiment(); // Correção: await para pegar os dados corretamente
                    console.log("investments_store", response);
        
                    set({
                       
                        investment: response, // Corrigido
                        isLoading: false,
                    });
                } catch (error) {
                    console.error("Erro ao buscar os dados dos gados:", error);
                    set({ isLoading: false });
                }


        
    }

}))
