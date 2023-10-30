/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { LayoutContext } from '@/layout/context/layoutcontext'
import { Demo } from '@/types/demo'
import { useAuth } from '@/hooks/useAuth'

const Dashboard = () => {
    const { user, logout } = useAuth({ middleware: 'auth' })
    return (
        <div className="grid">
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between">
                        <span className="block text-500 font-medium">Logged in: {user && user.firstname}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
