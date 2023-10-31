declare type AuthMiddleware = 'auth' | 'guest'

export interface IUseAuth {
    middleware: AuthMiddleware
    redirectIfAuthenticated?: string | null
}

export interface IApiRequest {
    setErrors: React.Dispatch<React.SetStateAction<never[]>>
    setStatus: React.Dispatch<React.SetStateAction<any | null>>

    [key: string]: any
}

export interface Session {
    user?: User | undefined
    menu?: []
}

export interface User {
    uuid: string
    // id?: number
    // name?: string
    firstname?: string
    lastname?: string
    language?: string
    email?: string
    email_verified_at?: string
    must_verify_email?: boolean // this is custom attribute
    created_at?: string
    updated_at?: string
}
