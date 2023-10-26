import Image from 'next/image'
import dotSVG from '../../public/layout/images/svg/dot.svg'
import { ReactElement, JSXElementConstructor } from 'react'

const MapMarker = (dot: { lat: any; lng: any; label?: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | null | undefined }) => (
    <div
        lat={dot.lat}
        lng={dot.lng}>
        <Image
            src={'../../../layout/images/svg/dot.svg'}
            height={64}
            width={64}
            alt={dot.label || null}
        />
        <div className="text-white -translate-y-10 translate-x-6">{dot.label}</div>
    </div>
)

export default MapMarker
