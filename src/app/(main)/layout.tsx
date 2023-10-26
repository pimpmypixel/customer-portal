import { Metadata } from 'next'
import Layout from '../../layout/layout'

interface AppLayoutProps {
    children: React.ReactNode
}

export const metadata: Metadata = {
    title: 'FaunaPhotonics Portal',
    description: 'We give you data that makes biodiversity actionable',
    robots: { index: false, follow: false },
    viewport: { initialScale: 1, width: 'device-width' },
    openGraph: {
        type: 'website',
        title: 'FaunaPhotonics Portal',
        url: 'https://faunaphotonics.com/',
        description: 'We give you data that makes biodiversity actionable',
        images: [
            // 'https://www.primefaces.org/static/social/sakai-react.png',
        ],
        ttl: 604800,
    },
    icons: {
        // icon: '/favicon.ico'
    },
}

export default function AppLayout({ children }: AppLayoutProps) {
    return <Layout>{children}</Layout>
}
