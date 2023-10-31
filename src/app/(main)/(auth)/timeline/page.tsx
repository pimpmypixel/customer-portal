/* eslint-disable @next/next/no-sync-scripts */
'use client'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { CustomEvent } from '@/types/demo'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Timeline } from 'primereact/timeline'

const Index = () => {
    const { session, logout } = useAuth({ middleware: 'auth' })
    const customEvents: CustomEvent[] = [
        {
            status: 'Wildlife Wanderer',
            date: '15/8/2023 10:30',
            icon: 'pi pi-check',
            color: '#3a8a0a',
            image: 'game-controller.jpg',
        },
        {
            status: 'Flora & Fauna Observer',
            date: '25/8/2023 14:00',
            icon: 'pi pi-check',
            color: '#673AB7',
        },
        {
            status: 'Ecosystem Explorer',
            date: '1/9/2023 16:15',
            icon: 'pi pi-check',
            color: '#FF9800',
        },
        {
            status: 'Biodiversity Apprentice',
            date: '16/9/2023 10:00',
            icon: 'pi pi-check',
            color: '#607D8B',
        },
        {
            status: 'Creature Tracker',
            date: '18/9/2023 10:30',
            icon: 'pi pi-check',
            color: '#9C27B0',
            image: 'game-controller.jpg',
        },
        {
            status: 'Botanical Enthusiast',
            date: '23/9/2023 14:00',
            icon: 'pi pi-check',
            color: 'rgba(103,58,183,0.5)',
            dimmed: true,
        },
        {
            status: 'Habitat Guardian',
            date: '1/10/2023 16:15',
            icon: 'pi pi-check',
            color: 'rgba(255,152,0,0.5)',
            dimmed: true,
        },
        {
            status: 'Species Preservationist',
            date: '16/10/2023 10:00',
            icon: 'pi pi-check',
            color: 'rgba(96,125,139,0.5)',
            dimmed: true,
        },
    ]

    const horizontalEvents = ['2023', '2024', '2025', '2026']

    const customizedContent = (item: CustomEvent) => {
        return (
            <Card
                className={item.dimmed ? 'opacity-30' : ''}
                title={item.status}
                subTitle={item.date}>
                {/*{item.image && (
                    <img
                        src={`/demo/images/product/${item.image}`}
                        onError={e => (e.currentTarget.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')}
                        alt={item.name}
                        width={200}
                        className="shadow-2 mb-3"
                    />
                )}*/}
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                <Button
                    label="Read more"
                    text></Button>
            </Card>
        )
    }

    const customizedMarker = (item: CustomEvent) => {
        return (
            <span
                className="custom-marker shadow-1"
                style={{ backgroundColor: item.color }}>
                <i className={item.icon}></i>
            </span>
        )
    }

    return (
        <>
            <div className="grid">
                {/*<div className="col-12">
                    <div className="card docs">
                        <h4>Current Version</h4>
                        <p>Next v14, React v18 with PrimeReact v9</p>

                        <h5>Logged in: {session?.user?.firstname}</h5>
                    </div>
                </div>*/}
                <div className="col-12">
                    <div className="card timeline-demo">
                        <h3>Your biodiversity-warrior™ score</h3>
                        <small>
                            Gamification is the use of game elements and mechanics to motivate, engage, and reward learners. It can be a powerful tool to enhance client relations training, as it can make the learning process more fun, interactive,
                            and memorable. In this article, you will learn how to gamify client relations training, and what benefits it can bring to your team and your clients.
                        </small>
                        <Timeline
                            value={customEvents}
                            align="alternate"
                            className="customized-timeline mt-4"
                            marker={customizedMarker}
                            content={customizedContent}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index
