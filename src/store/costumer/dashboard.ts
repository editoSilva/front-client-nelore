import { create } from 'zustand';
import { DashboardTypes } from '@/@types/costumer/dashboard/DashboardTypes'
import { apiGetDashboard } from '@/services/costumer/dashboard/ApiDashboard'

type DashboardStore = {
    dashboard: DashboardTypes | null
    isLoading: boolean
    fetchDashboard: () => void
}

export const useDashboardStore = create<DashboardStore>((set) => ({

        //State
        isLoading: true,
        dashboard: null,

        //Dispatch
        fetchDashboard: async () => {
            const response  =  await apiGetDashboard();    
            set({dashboard: response.data, isLoading: false})
            
        }
}));


