import base from '@/configs/base'

export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    locale: string
    accessTokenPersistStrategy: 'localStorage' | 'sessionStorage' | 'cookies'
    enableMock: boolean
}

const appConfig: AppConfig = {
    apiPrefix: base.baseUrl,
    authenticatedEntryPath: '/',
    unAuthenticatedEntryPath: '/sign-in',
    locale: 'pt_br',
    accessTokenPersistStrategy: 'localStorage',
    enableMock: true,
}

export default appConfig
