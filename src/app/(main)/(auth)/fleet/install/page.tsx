'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Menubar } from 'primereact/menubar'
import { InputText } from 'primereact/inputtext'
import { BreadCrumb } from 'primereact/breadcrumb'
import { Steps } from 'primereact/steps'
import { TabMenu } from 'primereact/tabmenu'
import { TieredMenu } from 'primereact/tieredmenu'
import { Menu } from 'primereact/menu'
import { Button } from 'primereact/button'
import { ContextMenu } from 'primereact/contextmenu'
import { MegaMenu } from 'primereact/megamenu'
import { PanelMenu } from 'primereact/panelmenu'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

const MenuDemo = ({ children }: any) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const menu = useRef<Menu>(null)
    const contextMenu = useRef<ContextMenu>(null)
    const router = useRouter()
    const pathname = usePathname()

    const checkActiveIndex = useCallback(() => {
        const paths = pathname.split('/')
        const currentPath = paths[paths.length - 1]

        switch (currentPath) {
            case 'seat':
                setActiveIndex(1)
                break
            case 'payment':
                setActiveIndex(2)
                break
            case 'confirmation':
                setActiveIndex(3)
                break
            default:
                break
        }
    }, [pathname])

    useEffect(() => {
        checkActiveIndex()
    }, [checkActiveIndex])

    const wizardItems = [
        { label: 'Personal', command: () => router.push('/uikit/menu') },
        { label: 'Seat', command: () => router.push('/uikit/menu/seat') },
        { label: 'Payment', command: () => router.push('/uikit/menu/payment') },
        {
            label: 'Confirmation',
            command: () => router.push('/uikit/menu/confirmation'),
        },
    ]

    return (
        <div className="grid p-fluid">
            <div className="col-12">
                <div className="card">
                    <h4>
                        <i className="fa-solid fa-square-plus mr-2" /> Install sensor
                    </h4>
                    <Steps
                        model={wizardItems}
                        activeIndex={activeIndex}
                        onSelect={e => setActiveIndex(e.index)}
                        readOnly={false}
                    />
                    {pathname === '/uikit/menu' ? (
                        <div className="flex align-items-center py-5 px-3">
                            <i className="pi pi-fw pi-user mr-2 text-2xl" />
                            <p className="m-0 text-lg">Personal Component Content via Child Route</p>
                        </div>
                    ) : (
                        <>{children}</>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MenuDemo
