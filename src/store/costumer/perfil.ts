import { create } from 'zustand';
import { apiGetPerfil } from '@/services/costumer/perfil/ApiPerfil';
import { PerfilTypes } from '@/@types/costumer/perfil/PerfilTypes';


export type PerfilState = {
    isLoading: boolean
    perfil: PerfilTypes
}

export type PerfilAction = {
    featchPerfil: () => void
}


const initialState : PerfilState = {
    isLoading: true,
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
                state: false, 
                postal_code: '', 
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
    isLoading: false,
    featchPerfil: async () => {
        const response = await apiGetPerfil();
            console.log('perfil response', response)
            set({perfil: response, isLoading:false})
    }

}));