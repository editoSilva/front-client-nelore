import base from '@/configs/base'

export type EndpointConfig = {
    dashboard: string
    transactions: string
    deposit: string
    depositStatus: string
    cattes: string
    catteshow: string
    investCatte: string
    listInvestments: string
    referrers: string
    commisions: string
    countLink: string
    perfil: string
    chatCattleWigt: string
    investmentChart: string
}

const endpointConfig: EndpointConfig = {
    dashboard: base.baseUrl+'/costumer/dashboard',
    transactions: base.baseUrl+'/costumer/deposits',
    deposit: base.baseUrl+'/costumer/deposit',
    depositStatus: base.baseUrl+'/costumer/show-transaction',
    cattes: base.baseUrl+'/costumer/suggested-investments?type=cattle',
    catteshow: base.baseUrl+'/costumer/cattle-suggest/',
    investCatte: base.baseUrl+'/costumer/investments/',
    listInvestments: base.baseUrl+'/costumer/investments/',
    referrers: base.baseUrl+'/costumer/referrals',
    commisions: base.baseUrl+'/costumer/commissions',
    countLink: base.baseUrl+'/costumer/count-link',
    perfil: base.baseUrl+'/authenticate/perfil',
    chatCattleWigt: base.baseUrl+'/costumer/chat-cattle-wigt',
    investmentChart: base.baseUrl+'/costumer/chat-investiment'
}

export default endpointConfig;
