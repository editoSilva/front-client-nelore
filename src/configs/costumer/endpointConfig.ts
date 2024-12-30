import base from '@/configs/base'

export type EndpointConfig = {
    dashboard: string,
    transactions: string,
}

const endpointConfig: EndpointConfig = {
    
    dashboard: base.baseUrl+'/costumer/dashboard',
    transactions: base.baseUrl+'/costumer/deposits'
    
}

export default endpointConfig;
