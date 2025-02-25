import { create } from 'zustand';
import { apiGetPerfil, ApiPostSendAddress, ApiPostSendPix } from '@/services/costumer/perfil/ApiPerfil';
import { Adress, PerfilTypes, PixKey } from '@/@types/costumer/perfil/PerfilTypes';


export type PerfilState = {
    isLoading: boolean
    isLoadingPix: boolean
    isLoadingAddress: boolean
    statusPixSend: boolean
    statusAddressSend: boolean
    perfil: PerfilTypes
}

export type PerfilAction = {
    featchPerfil: () => void
    insertPix: (payload: PixKey) => void
    insertAdress: (payload: Adress) => void
}


const initialState : PerfilState = {
    isLoading: false,
    isLoadingPix: false,
    isLoadingAddress: false,
    statusAddressSend: false,
    statusPixSend: false,
    perfil: {
        data: {
            id: 0,
            tenant_id: 1,
            referrer_id: 0,
            name: '',
            email: '',
            status: '',
            phone: '',
            cpf: '',
            code: '',
            role: '',
            visited_link: 0,
            last_visited: '',
            balance: 0,
            email_verified_at: '',
            created_at: '',
            update_at: '',
            adress: {
                address: '',
                neighborhood: '',
                number: '',
                city: '',
                state: '', 
                postal_code: '', 
                complement: ''
            },
            pixKey: {
                pix_key: '', 
                key_type: '', 
                is_active: false,
            },
            documents: {
                document_type: '',
                document_file_path:'',
                document_file_path_verse: '',
                status: false,
                selfie_file_path: '',
            }
        }
    }
   
    
}


export const  usePerfilSotre = create<PerfilState & PerfilAction>((set) => ({

    ...initialState,
  
    featchPerfil: async () => {
        const response = await apiGetPerfil();
            console.log('perfil response', response)
            set({perfil: response, isLoading:false})
    },
    insertPix: async (data) => {
        set({ 
            isLoadingPix: true,
        })
        try {
            const response = await ApiPostSendPix(data); 
            set({ 
                isLoadingPix: false, 
                statusPixSend: true
            })
            

            console.log('dataresponse', response)
        } catch (errors: any) {
            console.log('erros', errors)
        } finally {

              setTimeout(() => {
            set({ 
                isLoadingPix: false, 
                statusPixSend: false 
            });
        }, 2000); // Aguarda 2 segundos antes de resetar
        }
    },
    insertAdress: async (data) => {

        set({ 
            isLoadingAddress: true,
        })
        try {
            const response = await ApiPostSendAddress(data); 

            set({ 
                isLoadingAddress: false, 
                statusAddressSend: true
            })
            

            console.log('dataresponseAdres', response)
        } catch (errors: any) {
            console.log('erros', errors)
        } finally {

              setTimeout(() => {
            set({ 
                isLoadingAddress: false, 
                statusAddressSend: false 
            });
        }, 2000); // Aguarda 2 segundos antes de resetar
        }
        
    }


}));