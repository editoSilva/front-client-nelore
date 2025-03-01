
import base from '@/configs/base'


const auth = JSON.parse(localStorage.getItem("sessionUser") || "{}")

// console.log('authStorage', auth?.state?.user?.authority[0])


export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    locale: string
    accessTokenPersistStrategy: 'localStorage' | 'sessionStorage' | 'cookies'
    enableMock: boolean
    authenticatedEntryAdminPath: string
}

const appConfig: AppConfig = {
    apiPrefix: base.baseUrl,
    authenticatedEntryPath: auth?.state?.user?.authority[0] === 'admin' ? '/admin/dashboard' : '/dashboard',
    authenticatedEntryAdminPath: '/admin/dashboard',
    unAuthenticatedEntryPath: '/sign-in',
    locale: 'pt_br',
    accessTokenPersistStrategy: 'localStorage',
    enableMock: true,
}


export default appConfig
