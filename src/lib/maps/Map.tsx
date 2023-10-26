import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { Skeleton } from 'primereact/skeleton'
import mapStyles from '@/lib/maps/styles.json'
import MapMarker from '@/components/MapMarker'
import { useEffect } from 'react'

interface Props {
    gMapsApiStatus: bool
    mapOptions: object
    markers: array
}

const containerStyle = {
    width: '100%',
    height: '100%',
}

const Map = ({ gMapsApiStatus, mapOptions, markers }: Props) => {
    mapOptions.styles = mapStyles

    // const { isLoaded } = useJsApiLoader({
    //     id: 'google-map-script',
    //     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    // })

    const onLoad = marker => {
        console.log('marker: ', marker)
    }

    // useEffect(() => {
    //     console.log(isLoaded)
    // }, [isLoaded])

    return (
        <>
            {gMapsApiStatus ? (
                <GoogleMap
                    options={mapOptions}
                    mapContainerStyle={containerStyle}
                    center={mapOptions.center}
                    zoom={mapOptions.zoom}>
                    {markers.length > 0 &&
                        markers.map(
                            (
                                dot: React.JSX.IntrinsicAttributes & { lat: any; lng: any; label: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | null | undefined },
                                index: React.Key | null | undefined,
                            ) => {
                                // console.log(dot)
                                return (
                                    <Marker
                                        label={dot.label}
                                        position={{ lat: dot.lat, lng: dot.lng }}
                                        onLoad={onload}
                                        key={index}
                                    />
                                )
                            },
                        )}
                </GoogleMap>
            ) : (
                <Skeleton height={'100%'} />
            )}
        </>
    )
}

export default Map
