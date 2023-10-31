/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useContext, useEffect, useState } from 'react'
import AppMenuitem from './AppMenuitem'
import { LayoutContext } from './context/layoutcontext'
import { MenuProvider } from './context/menucontext'
import Link from 'next/link'
import { AppMenuItem } from '../types/types'
import { useApi } from '@/hooks/useApi'
import { useAuth } from '@/hooks/useAuth'
import useStorage from '@/hooks/useStorage'

const AppMenu = () => {
    const [menu, setMenu] = useState(null)
    const { session, logout } = useAuth({ middleware: 'auth' })

    useEffect(() => {
        if (session?.menu?.length) {
            setMenu(session.menu as any)
        }
    }, [session])

    return (
        <MenuProvider>
            {menu && (
                <ul className="layout-menu">
                    {menu.map((item: AppMenuItem | undefined, i: React.Key | number) => {
                        return !item?.seperator ? (
                            <AppMenuitem
                                item={item}
                                root={true}
                                index={i}
                                key={i}
                            />
                        ) : (
                            <li className="menu-separator"></li>
                        )
                    })}
                </ul>
            )}
        </MenuProvider>
    )
}

export default AppMenu
