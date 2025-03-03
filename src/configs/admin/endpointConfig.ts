import base from '@/configs/base'

export type EndpointConfig = {
    dashboard: string
}

const endpointConfig: EndpointConfig = {
    dashboard: base.baseUrl+'/admin/dashboard',

}

export default endpointConfig;



