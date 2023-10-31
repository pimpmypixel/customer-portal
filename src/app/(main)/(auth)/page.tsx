/* eslint-disable @next/next/no-sync-scripts */
'use client'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

const Index = () => {
    const { session, logout } = useAuth({ middleware: 'auth' })
    return (
        <>
            <div className="grid">
                <div className="col-12">
                    <div className="card docs">
                        <h4>Current Version</h4>
                        <p>Next v14, React v18 with PrimeReact v9</p>

                        <h5>Logged in: {session?.user?.firstname}</h5>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index
