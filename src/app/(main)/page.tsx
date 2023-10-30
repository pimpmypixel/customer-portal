/* eslint-disable @next/next/no-img-element */
'use client'
import { Button } from 'primereact/button'
import { Chart } from 'primereact/chart'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Menu } from 'primereact/menu'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ProductService } from '../../demo/service/ProductService'
import { LayoutContext } from '../../layout/context/layoutcontext'
import Link from 'next/link'
import { Demo } from '../../types/demo'
import { ChartData, ChartOptions } from 'chart.js'
import { useAuth } from '@/hooks/useAuth'

const Dashboard = () => {
    const { user, logout } = useAuth({ middleware: 'auth' })

    return (
        <div className="grid">
            {/*Quarter cards*/}
            {user && <h2>{user.name}</h2>}

            <div className="col-12 xl:col-6"></div>
        </div>
    )
}

export default Dashboard
