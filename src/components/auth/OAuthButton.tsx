import React, { useState, useEffect } from 'react'

import Image from 'next/image'
import googleIcon from '../../../public/layout/images/svg/google.svg'
import microsoftIcon from '../../../public/layout/images/svg/microsoft.svg'
import linkedinIcon from '../../../public/layout/images/svg/linkedin.svg'
import { Button } from 'primereact/button'

export default function OAuthButton({ media, label }) {
    const icons: any = {
        google: googleIcon,
        azure: microsoftIcon,
        linkedin: linkedinIcon,
    }

    return (
        <div className="flex items-center justify-center w-full mb-4 last:mb-0">
            <Button
                onClick={() => {
                    window.location.href = 'http://localhost/auth/' + media
                }}
                className="bg-white hover:bg-gray-200 border-bluegray-200 text-gray-600 w-full">
                <Image src={icons[media]} height={32} width={32} alt={label} className="mr-3" />
                Log in with {media}
            </Button>
        </div>
    )
}
