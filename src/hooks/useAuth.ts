import useSWR from 'swr'
import axios, { csrf } from '@/lib/axios'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { IUseAuth, Session } from '@/types/types'
import useStorage from '@/hooks/useStorage'
import { getCookie, setCookie } from 'cookies-next'

export const useAuth = ({ middleware, redirectIfAuthenticated }: IUseAuth) => {
    const router = useRouter()
    // const [customer, setCustomer] = useStorage('customer', null)
    // const [menu, setMenu] = useStorage('menu', null)
    // const [userObject, setUserObject] = useStorage('userObject', null)

    const {
        data: session,
        error,
        mutate,
    } = useSWR<Session>('session', () =>
        axios
            .get('/api/user')
            .then((res: { data: any }) => {
                setCookie('firstname', res.data.user.firstname)
                // setCustomer(res.data.customer)
                // setMenu(res.data.menu)
                // delete res.data.customer
                // delete res.data.menu
                // setUserObject(res.data)
                return res.data
            })
            .catch(
                (error: {
                    response: {
                        status: number
                    }
                }) => {
                    if (error.response.status !== 409) throw error
                    // router.push('/verify-email')
                },
            ),
    )

    const logout = async () => {
        if (!error) {
            await axios.post('/auth/logout').then(() => mutate())
        }
        router.push('/auth/login/?logout')
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && session) {
            router.push(redirectIfAuthenticated)
        }
        if (middleware === 'auth' && error) {
            logout()
        }
    }, [session, error])
    // }, [user, error, logout, redirectIfAuthenticated, middleware, router])

    return {
        session,
        logout,
    }
}
