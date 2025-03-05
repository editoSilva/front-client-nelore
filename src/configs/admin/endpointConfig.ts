import base from '@/configs/base'

export type EndpointConfig = {
    dashboard: string
    settings: string
    users: string
}

const endpointConfig: EndpointConfig = {
    dashboard: base.baseUrl+'/admin/dashboard',
    settings: base.baseUrl+'/admin/settings',
    users: base.baseUrl+'/admin/users'
}

export default endpointConfig;



