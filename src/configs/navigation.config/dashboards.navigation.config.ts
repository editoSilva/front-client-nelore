import { DASHBOARDS_PREFIX_PATH } from '@/constants/route.constant'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
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
        authority: [ADMIN, USER],
        meta: {
            horizontalMenu: {
                layout: 'default',
            },
        },
        subMenu: [
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
                key: 'dashboard.lots',
                path: `${DASHBOARDS_PREFIX_PATH}/ecommerce`,
                title: 'Lotes',
                translateKey: 'nav.dashboard.lots',
                icon: 'common',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'dashboard.financial',
                path: `${DASHBOARDS_PREFIX_PATH}/ecommerce`,
                title: 'Financeiro',
                translateKey: 'nav.dashboard.financial',
                icon: 'dashboardAnalytic',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'dashboard.affiliates',
                path: `${DASHBOARDS_PREFIX_PATH}/ecommerce`,
                title: 'nav.dashboard.affiliates',
                translateKey: 'nav.dashboard.affiliates',
                icon: 'customerList',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'dashboard.Knowledge_center',
                path: `${DASHBOARDS_PREFIX_PATH}/ecommerce`,
                title: 'Ecommerce',
                translateKey: 'nav.dashboard.Knowledge_center',
                icon: 'concepts',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'dashboard.legal',
                path: `${DASHBOARDS_PREFIX_PATH}/ecommerce`,
                title: 'Ecommerce',
                translateKey: 'nav.dashboard.legal',
                icon: 'documentation',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'dashboard.contracts',
                path: `${DASHBOARDS_PREFIX_PATH}/ecommerce`,
                title: 'Ecommerce',
                translateKey: 'nav.dashboard.contracts',
                icon: 'fileManager',
                type: NAV_ITEM_TYPE_ITEM,
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
