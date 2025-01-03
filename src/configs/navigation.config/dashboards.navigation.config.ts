import { DASHBOARDS_PREFIX_PATH } from '@/constants/route.constant'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE
} from '@/constants/navigation.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { NavigationTree } from '@/@types/navigation'

const dashboardsNavigationConfig: NavigationTree[] = [
    {
        key: 'dashboard',
        path: '',
        title: 'Dashboard',
        translateKey: 'nav.dashboard.dashboard',
        icon: 'dashboard',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ USER],
        meta: {
            horizontalMenu: {
                layout: 'default',
            },
        },
        subMenu: [
            {
                key: 'dashboard',
                path: 'dashboard',
                title: 'Home',
                translateKey: 'nav.dashboard.home',
                icon: 'home',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [
                    
                ],
            },
            {
                key: 'dashboard.ecommerce',
                path: `${DASHBOARDS_PREFIX_PATH}/ecommerce`,
                title: 'Ecommerce',
                translateKey: 'nav.dashboard.ecommerce',
                icon: 'dashboardEcommerce',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'dashboard.investiments',
                path: `${DASHBOARDS_PREFIX_PATH}/ecommerce`,
                title: 'Lotes',
                translateKey: 'nav.dashboard.investiments',
                icon: 'lots',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'dashboard.transactions',
                path: `${DASHBOARDS_PREFIX_PATH}/ecommerce`,
                title: 'Transações',
                translateKey: 'nav.dashboard.transacions',
                icon: 'finatial',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [ADMIN, USER],
                subMenu: [
                    {
                        key: 'deposits',
                        path: 'deposits',
                        title: 'Depósitos',
                        translateKey: 'Depósitos',
                        icon: 'FaNetworkWired',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        subMenu: [],
                    },
                    {
                        key: 'withdral',
                        path: `${DASHBOARDS_PREFIX_PATH}/ecommerce`,
                        title: 'Saques',
                        translateKey: 'Saques',
                        icon: 'FaNetworkWired',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        subMenu: [],
                    },
                ],
            },
            {
                key: 'dashboard.affiliates',
                path: `${DASHBOARDS_PREFIX_PATH}/ecommerce`,
                title: 'nav.dashboard.affiliates',
                translateKey: 'nav.dashboard.affiliates',
                icon: 'FaNetworkWired',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'dashboard.Knowledge_center',
                path: `${DASHBOARDS_PREFIX_PATH}/ecommerce`,
                title: 'Ecommerce',
                translateKey: 'nav.dashboard.Knowledge_center',
                icon: 'GiGraduateCap',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'dashboard.legal',
                path: `${DASHBOARDS_PREFIX_PATH}/ecommerce`,
                title: 'Ecommerce',
                translateKey: 'nav.dashboard.legal',
                icon: 'documentation',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'dashboard.contracts',
                path: `${DASHBOARDS_PREFIX_PATH}/ecommerce`,
                title: 'Ecommerce',
                translateKey: 'nav.dashboard.contracts',
                icon: 'FaFileContract',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [ADMIN, USER],
                subMenu: [],
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
