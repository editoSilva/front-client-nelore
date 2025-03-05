import base from '@/configs/base'

export type EndpointConfig = {
    dashboard: string
    settings: string
}

const endpointConfig: EndpointConfig = {
    dashboard: base.baseUrl+'/admin/dashboard',
    settings: base.baseUrl+'/admin/settings'

}

export default endpointConfig;



