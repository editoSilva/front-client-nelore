export type SignInCredential = {
    email: string
    password: string
    domain: string

}

export type SignInResponse = {
    data:{
        token: string
        user: {
            userId: string
            name: string
            authority: string[]
            avatar: string
            email: string
            cpf: string
            phone: string
            role: string
    }
    }
    
}


export type SignUpResponse = SignInResponse

export type SignUpCredential = {
    name: string
    email: string
    password: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
    code: string
    email: string
}

export type AuthRequestStatus = 'success' | 'failed' | ''

export type AuthResult = Promise<{
    status: AuthRequestStatus
    message: string
}>

export type User = {
    userId?: string | null
    avatar?: string | null
    name?: string | null
    cpf?: string | null
    phone?: string | null
    code?: string | null
    email?: string | null
    role?: string | null
    authority?: string[]
}

export type Token = {
    accessToken: string
    refereshToken?: string
}

export type OauthSignInCallbackPayload = {
    onSignIn: (tokens: Token, user?: User) => void
    redirect: () => void
}
