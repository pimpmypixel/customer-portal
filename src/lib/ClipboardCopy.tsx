import { useState } from 'react'

const ClipboardCopy = ({ copyText }: any) => {
    const [isCopied, setIsCopied] = useState(false)

    // This is the function we wrote earlier
    async function copyTextToClipboard(text: string) {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text)
        } else {
            return document.execCommand('copy', true, text)
        }
    }

    // onClick handler function for the copy button
    const handleCopyClick = () => {
        // Asynchronously call copyTextToClipboard
        copyTextToClipboard(copyText)
            .then(() => {
                // If successful, update the isCopied state value
                setIsCopied(true)
                setTimeout(() => {
                    setIsCopied(false)
                }, 1500)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <input
                type="text"
                value={copyText}
                readOnly
                className={'w-3/4 mr-2'}
            />
            {/* Bind our handler function to the onClick button property */}
            <button
                onClick={handleCopyClick}
                className={'border p-2.5'}>
                <span>{isCopied ? 'Copied!' : 'Copy'}</span>
            </button>
        </div>
    )
}

export default ClipboardCopy
