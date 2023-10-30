/* eslint-disable @next/next/no-sync-scripts */
'use client'
import React from 'react'
import { useAuth } from '@/hooks/useAuth'

const Documentation = () => {
    const { user, logout } = useAuth({ middleware: 'auth' })
    return (
        <>
            <div className="grid">
                <div className="col-12">
                    <div className="card docs">
                        <h4>Current Version</h4>
                        <p>Next v13, React v18 with PrimeReact v9</p>

                        <h5>Getting Started</h5>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Documentation
