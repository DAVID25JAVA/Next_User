import React from 'react'

function Loader() {
  return (
    <div className='h-screen flex justify-center items-center'>
        <div className='h-12 w-12 border-4 border-gray-900 border-t-transparent rounded-full animate-spin'>
            <div></div>
        </div>
    </div>
  )
}

export default Loader