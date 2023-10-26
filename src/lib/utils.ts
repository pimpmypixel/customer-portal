// import { clsx, type ClassValue } from 'clsx'
// import { twMerge } from 'tailwind-merge'

// function cn(...inputs: ClassValue[]) {
//     return twMerge(clsx(inputs))
// }

function capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1)
}

export const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    })
}

function formatDate(input: string | number): string {
    const date = new Date(input)
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })
}

function absoluteUrl(path: string) {
    return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export const utils = {
    // cn,
    formatCurrency,
    formatDate,
    absoluteUrl,
    capitalize,
}
