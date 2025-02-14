import base from '@/configs/base'

export type EndpointConfig = {
    dashboard: string
    transactions: string
    deposit: string
    depositStatus: string
    cattes: string
    catteshow: string
    investCatte: string
}

const endpointConfig: EndpointConfig = {
    dashboard: base.baseUrl+'/costumer/dashboard',
    transactions: base.baseUrl+'/costumer/deposits',
    deposit: base.baseUrl+'/costumer/deposit',
    depositStatus: base.baseUrl+'/costumer/show-transaction',
    cattes: base.baseUrl+'/costumer/suggested-investments?type=cattle',
    catteshow: base.baseUrl+'/costumer/cattle-suggest/',
    investCatte: base.baseUrl+'/costumer/investments/'
}

export default endpointConfig;
