'use client'
import { LayoutProvider } from '@/layout/context/layoutcontext'
import { PrimeReactProvider } from 'primereact/api'
import 'primereact/resources/primereact.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import '../styles/layout/layout.scss'
import '../styles/demo/Demos.scss'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { NextIntlClientProvider } from 'next-intl'

interface RootLayoutProps {
    children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
    const timeZone = 'Europe/Copenhagen'

    return (
        <html
            lang="en"
            suppressHydrationWarning>
            <head>
                <link
                    id="theme-css"
                    href={`/themes/fauna/theme.css`}
                    rel="stylesheet"></link>
            </head>
            <body>
                <NextIntlClientProvider
                    locale={'en'}
                    timeZone={timeZone}>
                    <PrimeReactProvider>
                        <LayoutProvider>{children}</LayoutProvider>
                    </PrimeReactProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
