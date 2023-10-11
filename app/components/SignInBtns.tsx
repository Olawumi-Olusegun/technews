import Image from 'next/image'
import React from 'react'

export default function SignInBtns() {
  return (
    <div>
        <h1 className='text-center mt-8'>Sign In</h1>
        <div className='mt-4 p-4 flex flex-col items-center justify-center gap-4'>
        
            <button type='button' className='flex items-center border p-4 rounded-full gap-4 hover:scale-105 hover:bg-slate transition'>
                <span>
                    <Image src={"/google-logo.svg"} width={30} height={30} alt='Google' />
                </span>
                Sign In Google 
            </button>

            <button type='button' className='flex items-center border p-4 rounded-full gap-4 hover:scale-105 hover:bg-slate transition'>
                <span>
                    <Image src={"/github-logo.svg"} width={30} height={30} alt='Github' />
                </span>
                Sign In with Github
            </button>

        </div>
    </div>
  )
}
