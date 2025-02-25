import { CattleWeight, InvestChart } from "@/@types/costumer/charts/ChartsTypes";
import { apiGetChatCattleWigt, apiGetChatInvestment } from "@/services/costumer/charts/ApiCharts";
import { create } from "zustand";

interface ChartState  {
    isLoading: boolean
    cattleweight: CattleWeight
    investmentchart: InvestChart
  
}

interface ChartActions {
    isLoading: boolean
    fetchCattleWeight: () => Promise<void>;
    fetchInvestChart: () => Promise<void>;
}


const initialState : ChartState = {
    isLoading: true,
        cattleweight: {
            dates: [],
            prices: []
        },
        investmentchart: {
            labels: [],
            percentages: []
        }
}

export const useChartStore = create<ChartState & ChartActions>((set) => ({

 ...initialState,
    isLoading: false,
    fetchCattleWeight: async () => {

        set({ isLoading: true});
          try {
                    const response = await apiGetChatCattleWigt() // Correção: await para pegar os dados corretamente
                  
        
                    set({
                       
                        cattleweight: response, // Corrigido
                        isLoading: false,
                    });
                } catch (error) {
                    console.error("Erro ao buscar os dados:", error);
                    set({ isLoading: false });
                }


        
    },
    fetchInvestChart: async () => {

        set({ isLoading: true});
          try {
                    const response = await apiGetChatInvestment() // Correção: await para pegar os dados corretamente
              
        
                    set({
                       
                        investmentchart: response, // Corrigido
                        isLoading: false,
                    });
                } catch (error) {
                    console.error("Erro ao buscar os dados:", error);
                    set({ isLoading: false });
                }


        
    },
    

}))
    


