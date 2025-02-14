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
export type Investment = {
        id: number;
        code: string;
        breed: string;
        farm: string;
        farm_id: number;
        shares_sold: number;
        total_shares: number;
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


export type InvestMentQotas = {
    type: string
    catte_id: string 
    shares: number[]
}

export type CatteShow =  {
    data: {
        amount: string;
        breed: string;
        code: string;
        created_at: string;
        farm: string;
        id: number;
        images: []; // Se a estrutura de imagens for simples
        name: string;
        price_per_share: string;
        quotas: Quota[]; // Quota precisa ser tipado separadamente
        shares_sold: number;
        status: string;
        total_shares: number;
        update_at: string;
        weight: string;
    }

}

export type InvestmentDetails = {
    amount: string;
    breed: string;
    code: string;
    created_at: string;
    farm: string;
    id: number;
    images: { image: string }[]; // Se a estrutura de imagens for simples
    name: string;
    price_per_share: string;
    quotas: Quota[]; // Quota precisa ser tipado separadamente
    shares_sold: number;
    status: string;
    total_shares: number;
    update_at: string;
    weight: string;
  };


export type InvestmentResponse = {
    data: {
        id: number
        type: string,
        investment_code: string,
        shares_acquired: number,
        total_invested: number,
        return_percentage: number,
        total_redeem: number,
        redeem_date: number,
        profit_total: number,
        membership_fee: number,
        rate: number,
        days: string,
        created_at: string,
        update_at: string,
        yieldHistories: number[]
       
    }
}

// Tipo para um Link de Navegação
interface NavigationLink {
    url: string | null;
    label: string;
    active: boolean;
}

// Tipo de resposta da API

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

export type CatteResponse = {
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