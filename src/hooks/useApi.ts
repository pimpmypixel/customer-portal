import useSWR from 'swr'
import axios, { csrf } from '../lib/axios'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// declare type AuthMiddleware = 'auth' | 'guest'

interface IUseApi {
    endpoint?: string
}

// interface IApiRequest {
//     setErrors: React.Dispatch<React.SetStateAction<never[]>>
//     setStatus: React.Dispatch<React.SetStateAction<any | null>>
//     [key: string]: any
// }

// export interface User {
//     id?: number
//     name?: string
//     email?: string
//     email_verified_at?: string
//     must_verify_email?: boolean // this is custom attribute
//     created_at?: string
//     updated_at?: string
// }

export const useApi = ({ endpoint }: IUseApi) => {
    const { data, error, isLoading, mutate } = useSWR<any>(
        process.env.NEXT_PUBLIC_BACKEND_URL + '/api/' + endpoint,
        () =>
            axios
                .get(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/' + endpoint)
                .then((res: { data: any }) => res.data)
                .catch((error: { response: any }) => error.response),
        // .catch(error => {
        //     if (error.response.status !== 409) throw error

        //     // router.push('/verify-email')
        // }),
    )

    return {
        data,
        isError: error,
        isLoading,
    }
}
