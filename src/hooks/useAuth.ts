import useSWR from 'swr'
import axios, { csrf } from '@/lib/axios'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { IUseAuth, User } from '@/types/types'
import useLocalStorage from '@/hooks/useLocalStorage'

export const useAuth = ({ middleware, redirectIfAuthenticated }: IUseAuth) => {
    const router = useRouter()
    const [customer, setCustomer] = useLocalStorage('customer', null)
    const [menu, setMenu] = useLocalStorage('menu', null)
    const [userObject, setUserObject] = useLocalStorage('userObject', null)

    const {
        data: user,
        error,
        mutate,
    } = useSWR<User>('/api/user', () =>
        axios
            .get('/api/user')
            .then((res: { data: any }) => {
                setCustomer(res.data.customer)
                setMenu(res.data.menu)
                delete res.data.customer
                delete res.data.menu
                setUserObject(res.data)
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
        window.location.pathname = '/auth/login'
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user) {
            router.push(redirectIfAuthenticated)
        }
        if (middleware === 'auth' && error) {
            logout()
        }
    }, [user, error])
    // }, [user, error, logout, redirectIfAuthenticated, middleware, router])

    return {
        user,
        logout,
    }
}
