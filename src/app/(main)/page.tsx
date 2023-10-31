/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

const Index = () => {
    const router = useRouter()
    const { session, logout } = useAuth({ middleware: 'auth' })

    useEffect(() => {
        session?.user && router.push('/' + session.user.language)
    }, [session])
}

export default Index
