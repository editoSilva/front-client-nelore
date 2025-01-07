import base from '@/configs/base'

export type EndpointConfig = {
    dashboard: string,
    transactions: string,
    deposit: string,
    depositStatus: string
}

const endpointConfig: EndpointConfig = {
    
    dashboard: base.baseUrl+'/costumer/dashboard',
    transactions: base.baseUrl+'/costumer/deposits',
    deposit: base.baseUrl+'/costumer/deposit',
    depositStatus: base.baseUrl+'/costumer/show-transaction',
    
}

export default endpointConfig;
