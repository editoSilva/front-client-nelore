// eslint-disable-next-line import/no-named-as-default
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './lang/en.json'
import pt_br from   './lang/pt_br.json'
import zh_cn from './lang/zh-cn.json'
import es from './lang/es.json'
import ar from './lang/ar.json'
import appConfig from '@/configs/app.config'

const resources = {
    pt_br: {
        translation: pt_br,
    },
    en: {
        translation: en,
    },
    zhCn: {
        translation: zh_cn,
    },
    es: {
        translation: es,
    },
    ar: {
        translation: ar,
    },
}

i18n.use(initReactI18next).init({
    resources,
    fallbackLng: appConfig.locale,
    lng: appConfig.locale,
    interpolation: {
        escapeValue: false,
    },
})

export const dateLocales: {
    [key: string]: () => Promise<ILocale>
} = {
    pt_br: () => import('dayjs/locale/pt'),
    en: () => import('dayjs/locale/en'),
    es: () => import('dayjs/locale/es'),
    zhCn: () => import('dayjs/locale/zh-cn'),
    ar: () => import('dayjs/locale/ar'),
}

export default i18n
