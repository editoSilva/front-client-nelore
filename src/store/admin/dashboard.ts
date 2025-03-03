import { create } from 'zustand';
import { CardTop } from '@/@types/admin/dashboard/DashboardTypes';
import { apiGetDashboard } from '@/services/admin/dashboard/ApiDashboard';

type DashboardState = {
    isLoading: boolean
    cardTop: CardTop
}

type DashboardActions = {

    fetchCardTop: () => void
}

const initialState: DashboardState = {

    isLoading: false,
    cardTop: {
        users:          0,
        deposits:       0,
        withdrawal:     0,
        investments:    0,
    }
}

export const useStoreDashboard = create<DashboardState & DashboardActions>((set) => ({

    ...initialState,
    fetchCardTop: async() => {
        set({
            isLoading: true
        })
        const response = await apiGetDashboard();

        console.log('responseStore', response)

        set({
            isLoading: false,
            cardTop: response
        })
    }

}))


