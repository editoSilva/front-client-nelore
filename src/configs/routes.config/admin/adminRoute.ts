import { lazy } from 'react'
import { ADMIN} from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const adminRoute: Routes = [
    {
        key: 'admin.dashboard',
        path: '/admin/dashboard',
        component: lazy(() => import('@/views/admin/dashboard')),
        authority: [ADMIN],
        meta: {
            pageContainerType: 'contained',
        },
    },

    {
        key: 'admin.settings',
        path: '/admin/settings',
        component: lazy(() => import('@/views/admin/settings')),
        authority: [ADMIN],
        meta: {
            pageContainerType: 'contained',
        },
    },
    // {
    //     key: 'deposits',
    //     path: '/deposits',
    //     component: lazy(() => import('@/views/costumer/transactions/deposit')),
    //     authority: [COSTUMER, SPONSOR],
    //     meta: {
    //         pageContainerType: 'contained',
    //     },
    // },
    // {
    //     key: 'withdrawals',
    //     path: '/withdrawals',
    //     component: lazy(() => import('@/views/costumer/transactions/withdrawal')),
    //     authority: [COSTUMER, SPONSOR],
    //     meta: {
    //         pageContainerType: 'contained',
    //     },
    // },
    // {
    //     key: 'invest-now',
    //     path: '/invest-now',
    //     component: lazy(() => import('@/views/costumer/cattle')),
    //     authority: [COSTUMER, SPONSOR],
    //     meta: {
    //         pageContainerType: 'contained',
    //     },
    // },
    // {
    //     key: 'invest-now',
    //     path: '/castle/:id',
    //     component: lazy(() => import('@/views/costumer/cattle_details')),
    //     authority: [COSTUMER, SPONSOR],
    //     meta: {
    //         pageContainerType: 'contained',
    //     },
    // },

    // {
    //     key: 'my-invest',
    //     path: '/my-invest',
    //     component: lazy(() => import('@/views/costumer/investments/index')),
    //     authority: [COSTUMER, SPONSOR],
    //     meta: {
    //         pageContainerType: 'contained',
    //     },
    // },
    // {
    //     key: 'reffers',
    //     path: '/reffers',
    //     component: lazy(() => import('@/views/costumer/referrer')),
    //     authority: [COSTUMER, SPONSOR],
    //     meta: {
    //         pageContainerType: 'contained',
    //     },
    // },
    // {
    //     key: 'commissions',
    //     path: '/commissions',
    //     component: lazy(() => import('@/views/costumer/commission')),
    //     authority: [COSTUMER, SPONSOR],
    //     meta: {
    //         pageContainerType: 'contained',
    //     },
    // },
    // {
    //     key: 'leiloes',
    //     path: '/leiloes',
    //     component: lazy(() => import('@/views/costumer/leiloes/')),
    //     authority: [COSTUMER, SPONSOR],
    //     meta: {
    //         pageContainerType: 'contained',
    //     },
    // },
    // {
    //     key: 'aulas',
    //     path: '/aulas',
    //     component: lazy(() => import('@/views/costumer/central_de_conhecimento/aulas/')),
    //     authority: [COSTUMER, SPONSOR],
    //     meta: {
    //         pageContainerType: 'contained',
    //     },
    // },
    // {
    //     key: 'legais',
    //     path: '/legais',
    //     component: lazy(() => import('@/views/costumer/juridico/legais')),
    //     authority: [COSTUMER, SPONSOR],
    //     meta: {
    //         pageContainerType: 'contained',
    //     },
    // },

    // {
    //     key: 'adesao',
    //     path: '/adesao',
    //     component: lazy(() => import('@/views/costumer/contrato/adesao')),
    //     authority: [COSTUMER, SPONSOR],
    //     meta: {
    //         pageContainerType: 'contained',
    //     },
    // },
    
]

//
export default adminRoute;