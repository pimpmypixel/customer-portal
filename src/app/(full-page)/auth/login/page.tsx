/* eslint-disable @next/next/no-img-element */
'use client'
import { useRouter } from 'next/navigation'
import React, { useContext, useRef, useEffect } from 'react'
import { LayoutContext } from '../../../../layout/context/layoutcontext'
import { classNames } from 'primereact/utils'
import { Card } from 'primereact/card'
import { getCookie } from 'cookies-next'
import OAuthButton from '../../../../components/auth/OAuthButton'
import { Toast } from 'primereact/toast'
import { useSearchParams } from 'next/navigation'
import { capitalize } from '@/lib/utils'

const LoginPage = () => {
    const { layoutConfig } = useContext(LayoutContext)
    const toast = useRef<Toast>(null)
    const firstname = getCookie('firstname') || null

    // const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' })
    const containerClassName = classNames('bg-image flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' })

    const searchParams = useSearchParams()
    useEffect(() => {
        if (toast.current != null && searchParams.has('logout')) {
            toast.current.replace({
                severity: 'success',
                summary: 'Successful',
                detail: 'Successfully logged out',
                life: 3000,
            })
        }
    }, [searchParams, toast])

    return (
        <div className={containerClassName}>
            <Toast ref={toast} />
            <Card>
                <div className={'flex flex-column align-items-center justify-content-center m-0 p-0'}>
                    <img
                        src={`/layout/images/splash_logo.png`}
                        width={'140px'}
                        alt="logo"
                        className={'mb-5'}
                    />
                    <div className="text-900 text-l font-medium mb-3">Welcome{firstname && <> back, {capitalize(firstname)}</>}!</div>
                    <span className="text-600 font-xs mb-4">Sign in to continue</span>
                </div>
                <OAuthButton
                    media="google"
                    label="Sign in with Google"
                />
                <OAuthButton
                    media="azure"
                    label="Sign in with Microsoft"
                />
                <OAuthButton
                    media="linkedin"
                    label="Sign in with LinkedIn"
                />
            </Card>
        </div>
    )
}

export default LoginPage
