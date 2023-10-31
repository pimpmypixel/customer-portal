/* eslint-disable @next/next/no-img-element */

import Link from 'next/link'
import { classNames } from 'primereact/utils'
import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { AppTopbarRef } from '../types/types'
import { Menu } from 'primereact/menu'
import { LayoutContext } from './context/layoutcontext'
import { useAuth } from '@/hooks/useAuth'
import { Badge } from 'primereact/badge'
// import { User } from '@/types/types'
// import { Dropdown } from 'primereact/dropdown'
// import './topmenu.css'
// import { Button } from 'primereact/button'

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext)
    const menubuttonRef = useRef(null)
    const topbarmenuRef = useRef(null)
    const topbarmenubuttonRef = useRef(null)
    const menu = useRef<Menu>(null)
    const [name, setName] = useState('')
    const { session, logout } = useAuth({ middleware: 'auth' })

    useEffect(() => {
        if (session !== undefined) {
            setName(session.user.firstname + ' ' + session.user.lastname)
        }
    }, [session])

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current,
    }))

    return (
        <div className="layout-topbar">
            <Link
                href="/"
                className="layout-topbar-logo">
                <img
                    width={'180em'}
                    src={`/layout/images/FaunaPhotonics_Letters.svg`}
                    alt="logo"
                />
                {/*<img src={`/layout/images/logo-${layoutConfig.colorScheme !== 'light' ? 'white' : 'dark'}.svg`} width="47.22px" height={'35px'} alt="logo" />*/}
                {/*<span>SAKAI</span>*/}
            </Link>

            <button
                ref={menubuttonRef}
                type="button"
                className="p-link layout-menu-button layout-topbar-button"
                onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>

            <button
                ref={topbarmenubuttonRef}
                type="button"
                className="p-link layout-topbar-menu-button layout-topbar-button"
                onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <div
                ref={topbarmenuRef}
                className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                <i
                    onClick={() => alert('hej')}
                    className="pi pi-user mr-2 mt-3 p-text-secondary p-overlay-badge"
                    style={{ fontSize: '1.5rem' }}>
                    <Badge value="2"></Badge>
                </i>
                {/*<button*/}
                {/*    type="button"*/}
                {/*    className="p-link layout-topbar-button">*/}
                {/*    <i className="pi pi-user"></i>*/}
                {/*    <span>Profile</span>*/}
                {/*</button>*/}
                <button
                    onClick={logout}
                    type="button"
                    className="p-link layout-topbar-button">
                    <i className="pi pi-sign-out text-gray-400"></i>
                    <span>Log out ({name})</span>
                </button>
            </div>
        </div>
    )
})

AppTopbar.displayName = 'AppTopbar'

export default AppTopbar
