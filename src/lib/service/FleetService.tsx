import { Demo } from '../../types/types'

export const FleetService = {
    getFleet() {
        const { data, error, isLoading } = useApi({ endpoint: 'fleet' })
        return fetch('http://localhost/api/fleet', {
            headers: {
                'Cache-Control': 'no-cache',
                Authorization: 'Bearer 11%7C77rwOx7PhPYC2XwZ2kAL3uphvL94eFpRWP6YLAlI901fa885',
            },
        }).then(res => res.json())
        // .then(d => d.data as Demo.Product[])
    },
}
