import { DASHBOARDS_PREFIX_PATH } from '@/constants/route.constant'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE
} from '@/constants/navigation.constant'

import {COSTUMER, SPONSOR, ADMIN } from '@/constants/roles.constant'
import type { NavigationTree } from '@/@types/navigation'

const dashboardsNavigationConfig: NavigationTree[] = [
    {
        key: 'dashboard',
        path: '',
        title: 'Dashboard',
        translateKey: 'nav.dashboard.dashboard',
        icon: 'dashboard',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [COSTUMER, SPONSOR, ADMIN],
        meta: {
            horizontalMenu: {
                layout: 'default',
            },
        },
        subMenu: [
            //Admin
            {
                key: 'dashboard',
                path: '/admin/dashboard',
                title: 'Home',
                translateKey: 'nav.dashboard.home',
                icon: 'home',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN],
                subMenu: [
                    
                ],
            },
            {
                key: 'dashboard',
                path: '/admin/users',
                title: 'Clientes',
                translateKey: 'Clientes',
                icon: 'customers',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN],
                subMenu: [
                    
                ],
            },
            {
                key: 'dashboard',
                path: '/admin/users',
                title: 'Arrobas',
                translateKey: 'Valor Arrobas',
                icon: 'luatsign',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN],
                subMenu: [
                    
                ],
            },
            {
                key: 'dashboard',
                path: '/admin/users',
                title: 'Adiquirentes',
                translateKey: 'Adiquirentes',
                icon: 'sicontactlesspayment',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN],
                subMenu: [
                    
                ],
            },
            
            {
                key: 'admin.transactions',
                path: '',
                title: 'Transações',
                translateKey: 'nav.dashboard.transacions',
                icon: 'transactions',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [ADMIN],
                subMenu: [
                    {
                        key: 'deposits',
                        path: '/admin/deposits',
                        title: 'Depósitos',
                        translateKey: 'Depósitos',
                        icon: 'FaNetworkWired',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN],
                        subMenu: [],
                    },
                    {
                        key: 'withdrawals',
                        path: '/admin/withdrawals',
                        title: 'Saques',
                        translateKey: 'withdrawals',
                        icon: 'FaNetworkWired',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN],
                        subMenu: [],
                    },
                ],
            },
            {
                key: 'dashboard',
                path: '/admin/users',
                title: 'Fazendas',
                translateKey: 'Fazendas',
                icon: 'farm',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN],
                subMenu: [
                    
                ],
            },
            {
                key: 'dashboard',
                path: '/admin/users',
                title: 'Animais',
                translateKey: 'Animais',
                icon: 'cow',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN],
                subMenu: [
                    
                ],
            },
           

            //Costumer & sponsor
            {
                key: 'dashboard',
                path: 'dashboard',
                title: 'Home',
                translateKey: 'nav.dashboard.home',
                icon: 'home',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [COSTUMER, SPONSOR],
                subMenu: [
                    
                ],
            },
            {
                key: 'dashboard.auctions',
                path: '/leiloes',
                title: 'Leilões',
                translateKey: 'nav.dashboard.auctions',
                icon: 'GiThorHammer',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [COSTUMER, SPONSOR],
                subMenu: [],
            },
            {
                key: 'dashboard.investiments',
                path: `${DASHBOARDS_PREFIX_PATH}/ecommerce`,
                title: 'Investimentos',
                translateKey: 'Investimentos',
                icon: 'bsCurrencyExchange',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [COSTUMER, SPONSOR],
                subMenu: [
                    {
                        key: 'invest-now',
                        path: 'invest-now',
                        title: 'Invista Agora',
                        translateKey: 'Invista Agora',
                        icon: 'FaNetworkWired',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [COSTUMER, SPONSOR],
                        subMenu: [],
                    },
                    {
                        key: 'my-invest',
                        path: 'my-invest',
                        title: 'Meus Investimentos',
                        translateKey: 'Meus Investimentos',
                        icon: 'FaNetworkWired',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [COSTUMER, SPONSOR],
                        subMenu: [],
                    },
                ],
            },
            {
                key: 'dashboard.transactions',
                path: `${DASHBOARDS_PREFIX_PATH}/ecommerce`,
                title: 'Transações',
                translateKey: 'nav.dashboard.transacions',
                icon: 'transactions',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [COSTUMER, SPONSOR],
                subMenu: [
                    {
                        key: 'deposits',
                        path: 'deposits',
                        title: 'Depósitos',
                        translateKey: 'Depósitos',
                        icon: 'FaNetworkWired',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [COSTUMER, SPONSOR],
                        subMenu: [],
                    },
                    {
                        key: 'withdrawals',
                        path: 'withdrawals',
                        title: 'Saques',
                        translateKey: 'withdrawals',
                        icon: 'FaNetworkWired',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [COSTUMER, SPONSOR],
                        subMenu: [],
                    },
                ],
            },
            {
                key: 'dashboard.affiliates',
                path: `${DASHBOARDS_PREFIX_PATH}/ecommerce`,
                title: 'Afiliados',
                translateKey: 'nav.dashboard.affiliates',
                icon: 'FaNetworkWired',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [SPONSOR],
                subMenu: [
                    {
                        key: 'reffers',
                        path: 'reffers',
                        title: 'Cadastros',
                        translateKey: 'Cadastros',
                        icon: 'FaNetworkWired',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [SPONSOR],
                        subMenu: [],
                    },
                    {
                        key: 'commissions',
                        path: 'commissions',
                        title: 'Comissões',
                        translateKey: 'commissions',
                        icon: 'FaNetworkWired',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [SPONSOR],
                        subMenu: [],
                    },
                ],
            },
            {
                key: 'central-de-conhecimento',
                path: 'central-de-conhecimento',
                title: 'Central de Conhecimento',
                translateKey: 'nav.dashboard.Knowledge_center',
                icon: 'GiGraduateCap',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [COSTUMER, SPONSOR],
                subMenu: [
                    {
                        key: 'aulas',
                        path: 'aulas',
                        title: 'Aulas',
                        translateKey: 'Aulas',
                        icon: 'GiGraduateCap',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [COSTUMER, SPONSOR],
                        subMenu: [],
                    },
                ],
            },
            {
                key: 'dashboard.legal',
                path: `${DASHBOARDS_PREFIX_PATH}/ecommerce`,
                title: 'Jurídico',
                translateKey: 'nav.dashboard.legal',
                icon: 'documentation',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [COSTUMER, SPONSOR],
                subMenu: [
                    {
                        key: 'legais',
                        path: 'legais',
                        title: 'Aspectos Legais',
                        translateKey: 'Aspectos Legais',
                        icon: 'GiGraduateCap',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [COSTUMER, SPONSOR],
                        subMenu: [],
                    },
                ],
            },
            {
                key: 'dashboard.contracts',
                path: `${DASHBOARDS_PREFIX_PATH}/ecommerce`,
                title: 'Contratos',
                translateKey: 'nav.dashboard.contracts',
                icon: 'FaFileContract',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [COSTUMER, SPONSOR],
                subMenu: [
                    {
                        key: 'adesao',
                        path: 'adesao',
                        title: 'Adesão',
                        translateKey: 'Adesão',
                        icon: 'GiGraduateCap',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [COSTUMER, SPONSOR],
                        subMenu: [],
                    },
                ],
            },
           
            // {
            //     key: 'dashboard.project',
            //     path: `${DASHBOARDS_PREFIX_PATH}/project`,
            //     title: 'Project',
            //     translateKey: 'nav.dashboard.project',
            //     icon: 'dashboardProject',
            //     type: NAV_ITEM_TYPE_ITEM,
            //     authority: [ADMIN, USER],
            //     subMenu: [],
            // },
            // {
            //     key: 'dashboard.marketing',
            //     path: `${DASHBOARDS_PREFIX_PATH}/marketing`,
            //     title: 'Marketing',
            //     translateKey: 'nav.dashboard.marketing',
            //     icon: 'dashboardMarketing',
            //     type: NAV_ITEM_TYPE_ITEM,
            //     authority: [ADMIN, USER],
            //     subMenu: [],
            // },
            // {
            //     key: 'dashboard.analytic',
            //     path: `${DASHBOARDS_PREFIX_PATH}/analytic`,
            //     title: 'Analytic',
            //     translateKey: 'nav.dashboard.analytic',
            //     icon: 'dashboardAnalytic',
            //     type: NAV_ITEM_TYPE_ITEM,
            //     authority: [ADMIN, USER],
            //     subMenu: [],
            // },
        ],
    },
]

export default dashboardsNavigationConfig
