import React from 'react';

export default function LoginSeparator() {
    return (
        <div className='flex justify-between my-5'>
            <div className='w-full flex items-center'>
                <hr className='w-full border-input-border-light-grey' />
            </div>
            <div className='text-sm text-credits-color mx-3 pb-1'>or</div>
            <div className='w-full flex items-center'>
                <hr className='w-full border-input-border-light-grey' />
            </div>
        </div>
    );
}
