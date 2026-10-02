import { SignIn } from '@clerk/clerk-react'
import React from 'react'
// import { registerUser, loginUser, saveResume, getResumes  } from './api'


const SignInPage = () => {
  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-50 p-6'>
      <div className='w-full max-w-md p-8'>
          <div className='space-y-4'>
            <SignIn/>
          </div>
      </div>
    </div>
  )
}

export default SignInPage
