import {Models} from '../../types/types'

export const NewsItemService = {
    getNewsItems() {
        return fetch('/demo/data/products.json', {headers: {'Cache-Control': 'no-cache'}})
            .then(res => res.json())
            .then(d => d.data as Models.News[])
    },
    // getFleet() {
    //     return fetch('http://localhost/api/fleet', {
    //         headers: {
    //             'Cache-Control': 'no-cache',
    //             Authorization: 'Bearer 11%7C77rwOx7PhPYC2XwZ2kAL3uphvL94eFpRWP6YLAlI901fa885',
    //         },
    //     }).then(res => res.json())
    //     // .then(d => d.data as Demo.Product[])
    // },
    // getProductsSmall() {
    //     return fetch('/demo/data/products-small.json', { headers: { 'Cache-Control': 'no-cache' } })
    //         .then(res => res.json())
    //         .then(d => d.data as Demo.Product[])
    // },
    //
    //
    // getProductsWithOrdersSmall() {
    //     return fetch('/demo/data/products-orders-small.json', { headers: { 'Cache-Control': 'no-cache' } })
    //         .then(res => res.json())
    //         .then(d => d.data as Demo.Product[])
    // },
}
