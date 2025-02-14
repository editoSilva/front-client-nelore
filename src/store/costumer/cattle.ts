import { create } from "zustand";
import { apiGetCatte, apiGetCatteShow, ApiPostInvestCatte } from "@/services/costumer/catte/ApiCatte";
import { CatteResponse, CatteShow, InvestMentQotas, InvestmentResponse } from "@/@types/costumer/catte/CattleType";

// Tipo para um Quota
interface Quota {
    id: number;
    amount: string;
    weight: string;
    status: string;
    number: number;
}

// Tipo para uma Imagem
interface Image {
    id: number;
    image: string;
}

// Tipo para um Investimento
interface Investment {
    id: number;
    code: string;
    farm_id: number;
    farm: string;
    name: string;
    price_per_share: string;
    amount: string;
    weight: string;
    status: string;
    created_at: string;
    update_at: string;
    quotas: Quota[];
    images: Image[];
}




// Tipo para os Links da paginação
interface PaginationLinks {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
}

// Tipo para um Link de Navegação
interface NavigationLink {
    url: string | null;
    label: string;
    active: boolean;
}

// Tipo para os Metadados da paginação
interface Meta {
    current_page: number;
    from: number;
    last_page: number;
    links: NavigationLink[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}

// Tipo para a resposta completa da API
export interface ApiCatteResponse {
    data: [];
    links: PaginationLinks;
    meta: Meta;
    cattes: CatteResponse;
    catte_show: CatteShow // Alterei para permitir 'null'

}

// Definição das ações do store
interface CattleActions {
    isLoading: boolean;
    fetchCattles: () => Promise<void>;
    featchCatteShow: (id: string) => void
    featchInvestCatte: (data: InvestMentQotas) => void
    
}

export type CatteListState = {
    isLoading: boolean
    cattes: CatteResponse
    catte_show: CatteShow 
    invest: InvestmentResponse
    statusInvest: boolean
}

const initialState: CatteListState = {
    cattes:{
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
    },
    catte_show: {
        data: {
            amount: '0',
            breed: '',
            code: '',
            created_at: '',
            farm: '',
            id: 0,
            images: [], // Se a estrutura de imagens for simples
            name: '',
            price_per_share: '',
            quotas: [], // Quota precisa ser tipado separadamente
            shares_sold: 0,
            status: '',
            total_shares: 0,
            update_at: '',
            weight: '',
        }
    },
    statusInvest: false,
    invest: {
        data: {
            id: 0,
            type: 'cattle',
            investment_code: '',
            shares_acquired: 0,
            total_invested: 0,
            return_percentage: 0,
            total_redeem: 0,
            redeem_date: 0,
            profit_total: 0,
            membership_fee: 0,
            rate: 0.00,
            days: '',
            created_at: '',
            update_at: '',
            yieldHistories: [],
           
        }
    },

    isLoading: true,
}

export const useCattleStore = create<CatteListState & CattleActions>((set) => ({


 
    ...initialState,
    isLoading: false,
    featchCatteShow: async (data) => {
        set({ isLoading: true });
        try {
            const response = await  apiGetCatteShow(data); // Correção: await para pegar os dados corretamente
              set({
                catte_show: response,
                isLoading: false,
            });
        } catch (error) {
            console.error("Erro ao buscar os dados dos gados:", error);
            set({ isLoading: false });
        }
       
    },
    fetchCattles: async () => {
        set({ isLoading: true });
        try {
            const response = await apiGetCatte(); // Correção: await para pegar os dados corretamente
            console.log("catte", response);

            set({
               
                cattes: response, // Corrigido
                isLoading: false,
            });
        } catch (error) {
            console.error("Erro ao buscar os dados dos gados:", error);
            set({ isLoading: false });
        }
    },
    featchInvestCatte: async (data) => {
        set({ isLoading: true });
        try {
            const response = await ApiPostInvestCatte(data); // Correção: await para pegar os dados corretamente
            

            set({
                statusInvest: true,
                invest: response, // Corrigido
                isLoading: false,
            });
        } catch (error) {
            console.error("Erro ao buscar os dados dos gados:", error);
            set({ isLoading: false,   statusInvest: false, });
        }
        
    }
}));
