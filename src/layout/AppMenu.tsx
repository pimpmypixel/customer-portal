/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react'
import AppMenuitem from './AppMenuitem'
import { LayoutContext } from './context/layoutcontext'
import { MenuProvider } from './context/menucontext'
import Link from 'next/link'
import { AppMenuItem } from '../types/types'
import { useApi } from '@/hooks/useApi'
import { useAuth } from '@/hooks/useAuth'
import useLocalStorage from '@/hooks/useLocalStorage'

const AppMenu = () => {
    // const { layoutConfig } = useContext(LayoutContext)
    const [model, _] = useLocalStorage('menu')

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
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

                {/*<Link href="https://blocks.primereact.org" target="_blank" style={{ cursor: 'pointer' }}>
                    <img alt="Prime Blocks" className="w-full mt-3" src={`/layout/images/banner-primeblocks${layoutConfig.colorScheme === 'light' ? '' : '-dark'}.png`} />
                </Link>*/}
            </ul>
        </MenuProvider>
    )
}

export default AppMenu
