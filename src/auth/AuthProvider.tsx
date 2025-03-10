import { useRef, useImperativeHandle, forwardRef } from 'react'
import AuthContext from './AuthContext'
import appConfig from '@/configs/app.config'
import { useSessionUser, useToken } from '@/store/authStore'
import { apiSignIn, apiSignOut, apiSignUp } from '@/services/AuthService'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { useNavigate } from 'react-router-dom'

import type {
    SignInCredential,
    SignUpCredential,
    AuthResult,
    OauthSignInCallbackPayload,
    User,
    Token,
} from '@/@types/auth'

import type { ReactNode } from 'react'
import type { NavigateFunction } from 'react-router-dom'

type AuthProviderProps = { children: ReactNode }

export type IsolatedNavigatorRef = {
    navigate: NavigateFunction
}

const IsolatedNavigator = forwardRef<IsolatedNavigatorRef>((_, ref) => {
    const navigate = useNavigate()

    useImperativeHandle(ref, () => {
        return {
            navigate,
        }
    }, [navigate])

    return <></>
})

function AuthProvider({ children }: AuthProviderProps) {
    const signedIn = useSessionUser((state) => state.session.signedIn)
    const user = useSessionUser((state) => state.user)
    const setUser = useSessionUser((state) => state.setUser)
    const setSessionSignedIn = useSessionUser(
        (state) => state.setSessionSignedIn,
    )
    const { token, setToken } = useToken()

    const authenticated = Boolean(token && signedIn)

    const navigatorRef = useRef<IsolatedNavigatorRef>(null)

    const path = '';
  
    const redirect = () => {

        const search = window.location.search
        const params = new URLSearchParams(search)
        const redirectUrl = params.get(REDIRECT_URL_KEY)

        navigatorRef.current?.navigate(
            redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath,
        )
        // if(user.role === 'costumer' || user.role === 'sponsor') {
        //     const search = window.location.search
        //     const params = new URLSearchParams(search)
        //     const redirectUrl = params.get(REDIRECT_URL_KEY)
    
        //     navigatorRef.current?.navigate(
        //         redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath,
        //     )
        // }
        // if(user.role === 'admin') {
        //     console.log('rota admin',appConfig.authenticatedEntryAdminPath)
        //     const search = window.location.search
        //     const params = new URLSearchParams(search)
        //     const redirectUrl = params.get(REDIRECT_URL_KEY)

        //     console.log('redirectUrl', redirectUrl)
    
        //     navigatorRef.current?.navigate(
        //         redirectUrl ? redirectUrl : appConfig.authenticatedEntryAdminPath
        //     )
        // }
       
    }

    const handleSignIn = (tokens: Token, user?: User) => {
        setToken(tokens.accessToken)
        setSessionSignedIn(true)

        if (user) {
            setUser(user)
        }
    }

    const handleSignOut = () => {
        setToken('')
        setUser({})
        setSessionSignedIn(false)
    }

    const signIn = async (values: SignInCredential): AuthResult => {
        try {
            const resp = await apiSignIn(values)
            if (resp) {
                handleSignIn({ accessToken: resp.data.token }, resp.data.user)
                redirect()
                return {
                    status: 'success',
                    message: '',
                }
            }
            return {
                status: 'failed',
                message: 'Unable to sign in',
            }
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } catch (errors: any) {
        
            return {
                status: 'failed',
                message: errors?.response?.data?.errors
                ? Object.values(errors.response.data.errors)
                    .flat() // Junta todos os arrays em um único array
                    .join("\n") // Converte para uma string separada por vírgulas
                : errors?.response?.data?.data?.message || errors.toString(),
            }
        }
    }

    const signUp = async (values: SignUpCredential): AuthResult => {
        try {
            const resp = await apiSignUp(values)
        
            handleSignIn({ accessToken: resp.data.token }, resp.data.user)
            redirect()
            return {
                status: 'success',
                message: '',
            }
            // if (resp) {
            //     handleSignIn({ accessToken: resp.data.token }, resp.data.user)
            //     redirect()
            //     return {
            //         status: 'success',
            //         message: '',
            //     }
            // }
            // return {
            //     status: 'failed',
            //     message: 'Unable to sign up',
            // }
  
        } catch (errors: any) {
            console.log('errosSigIn', errors?.response?.data?.errors
                )
            return {
                status: 'failed',
                message: errors?.response?.data?.errors
                ? Object.values(errors.response.data.errors)
                    .flat() // Junta todos os arrays em um único array
                    .join(" | ") // Adiciona quebra de linha entre os erros
                : errors?.response?.data?.data?.message || errors.toString(),
            }
        }
    }

    const signOut = async () => {
        try {
            await apiSignOut()
        } finally {
            handleSignOut()
            navigatorRef.current?.navigate(appConfig.unAuthenticatedEntryPath)
        }
    }
    const oAuthSignIn = (
        callback: (payload: OauthSignInCallbackPayload) => void,
    ) => {
        callback({
            onSignIn: handleSignIn,
            redirect,
        })
    }

    return (
        <AuthContext.Provider
            value={{
                authenticated,
                user,
                signIn,
                signUp,
                signOut,
                oAuthSignIn,
            }}
        >
            {children}
            <IsolatedNavigator ref={navigatorRef} />
        </AuthContext.Provider>
    )
}

IsolatedNavigator.displayName = 'IsolatedNavigator'

export default AuthProvider
