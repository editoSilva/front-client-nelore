import { lazy } from 'react'
import { ADMIN, USER, COSTUMER } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const costumerRoute: Routes = [
    {
        key: 'dashboard',
        path: '/dashboard',
        component: lazy(() => import('@/views/costumer/dashboard')),
        authority: [COSTUMER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    {
        key: 'deposits',
        path: '/deposits',
        component: lazy(() => import('@/views/costumer/transactions/deposit')),
        authority: [COSTUMER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    {
        key: 'withdrawals',
        path: '/withdrawals',
        component: lazy(() => import('@/views/costumer/transactions/withdrawal')),
        authority: [COSTUMER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    {
        key: 'invest-now',
        path: '/invest-now',
        component: lazy(() => import('@/views/costumer/cattle')),
        authority: [COSTUMER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    {
        key: 'invest-now',
        path: '/castle/:id',
        component: lazy(() => import('@/views/costumer/cattle_details')),
        authority: [COSTUMER],
        meta: {
            pageContainerType: 'contained',
        },
    },

    {
        key: 'my-invest',
        path: '/my-invest',
        component: lazy(() => import('@/views/costumer/investments/index')),
        authority: [COSTUMER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    {
        key: 'reffers',
        path: '/reffers',
        component: lazy(() => import('@/views/costumer/referrer')),
        authority: [COSTUMER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    {
        key: 'commissions',
        path: '/commissions',
        component: lazy(() => import('@/views/costumer/commission')),
        authority: [COSTUMER],
        meta: {
            pageContainerType: 'contained',
        },
    },

    
]

export default costumerRoute;