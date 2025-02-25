


export type Adress = {
    address: string
    neighborhood: string 
    number: string 
    city: string 
    state: string
    postal_code: string  
    complement: string
}

export type Documents = {
    document_type: string
    document_file_path: string
    document_file_path_verse: string
    status: boolean
    selfie_file_path: string
}
export type PixKey = {
        pix_key: string, 
        key_type: string 
        is_active: boolean
}

export type PerfilTypes = {
    data: {
        id: number
        tenant_id: number
        referrer_id: number
        name: string
        email: string
        status: string
        phone: string
        cpf: string
        code: string
        role: string
        visited_link: number
        last_visited: string
        balance: number
        email_verified_at: string
        created_at: string
        update_at: string
        adress: Adress
        pixKey: PixKey
        documents: Documents
    }
}