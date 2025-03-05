import { SettingsResponse, SettingsType} from '@/@types/admin/settings/SettingsTypes'
import { apiGetSettings, apiUpdateSettings } from '@/services/admin/settings/ApiSettings'
import { create } from 'zustand'


type SettingsState = {
    isLoading: boolean
    settings: SettingsResponse
    isMessageSuccess: boolean
    message: string
}


type SettingsActions = {

        feachSettings: () => void
        updateSettings: (payload: SettingsType) => void
}


const initialState: SettingsState = {

    isLoading: false,
    isMessageSuccess: false,
    message: '',
    settings: {
            data: {
                id: '',
                withdrawal_invest_days: 0,
                withdrawal_fee: 0.00,
                max_invested_capital_percentage: 0.00,
                membership_fee: 0.00,
                min_withdrawal: 0.00,
                max_withdrawal: 0.00
            }
    }
}


export const  useStoreSettings = create<SettingsState & SettingsActions>((set) => ({

        ...initialState,
        feachSettings:  async () =>  {

            set({
                isLoading: true
            })

            const response = await apiGetSettings();

            set({
                isLoading:false,
                settings: response
            })

        },

        updateSettings: async (data) => {

            set({
                isLoading: true
            })

       
                try {
                        const response = await apiUpdateSettings(data);
                
                        console.log('response-data', response)

                        set({
                            isLoading: false,
                            isMessageSuccess: true,
                            message: 'Atualizado com sucesso'
                        })
           
                
                } catch (error) {

                    set({
                        isLoading: false,
                        isMessageSuccess: true,
                        // message: 'Atualizado com sucesso'
                    })
                    console.log('error', error)
                } finally {
                    setInterval(() => {
                        set({
                            isMessageSuccess: false
                        })
                    }, 2000)

                    // set({
                    //     isLoading: false,
                    //     isMessageSuccess: false,
                    //     // message: 'Atualizado com sucesso'
                    // })
        
                }
          
            // if(response === 200) {
               
            //     set({
            //         isLoading: false,
            //         // isMessageSucess: true,
            //         // message: 'Atualizado com sucesso'
            //     })
            // }
           

          

        }

}))



