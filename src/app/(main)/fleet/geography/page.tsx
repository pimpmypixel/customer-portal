'use client'
import React from 'react'
import { IGMapsApiStatus } from '@/types/maps'
import Map from '@/lib/maps/Map'
import * as process from 'process'
import { useState } from 'react'
import { useExternalScript } from '@/hooks/useExternalScript'
// todo change to API
import markers from '@/lib/maps/markers'

const MapPage = () => {
    const key: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    const GMapsApiStatus: IGMapsApiStatus = useExternalScript(`https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&callback=Function.prototype`)

    const mapOptions: any = {
        center: {
            lat: 55.6484318,
            lng: 12.5499154,
        },
        zoom: 15,
    }

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <div style={{ height: '50vh', width: '100%' }}>
                        <Map
                            markers={markers}
                            mapOptions={mapOptions}
                            gMapsApiStatus={GMapsApiStatus.status === 'ready'}
                        />
                        {/*<GoogleMapReact
                            options={mapOptions}
                            bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY }}
                            defaultCenter={mapOptions.center}
                            defaultZoom={mapOptions.zoom}>
                            {coords.map(
                                (
                                    dot: React.JSX.IntrinsicAttributes & { lat: any; lng: any; label: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | null | undefined },
                                    index: React.Key | null | undefined,
                                ) => (
                                    <MapMarker
                                        key={index}
                                        {...dot}
                                    />
                                ),
                            )}
                        </GoogleMapReact>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MapPage
