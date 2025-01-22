import { lazy } from 'react'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const costumerRoute: Routes = [
    {
        key: 'dashboard',
        path: '/dashboard',
        component: lazy(() => import('@/views/costumer/dashboard')),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    {
        key: 'deposits',
        path: '/deposits',
        component: lazy(() => import('@/views/costumer/transactions/deposit')),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    {
        key: 'withdrawals',
        path: '/withdrawals',
        component: lazy(() => import('@/views/costumer/transactions/withdrawal')),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    {
        key: 'invest-now',
        path: '/invest-now',
        component: lazy(() => import('@/views/costumer/cattle')),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
]

export default costumerRoute;