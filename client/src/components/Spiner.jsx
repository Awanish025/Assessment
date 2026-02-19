import React from 'react'

const Spiner = () => {
    return (
        <div className='flex justify-center items-center w-full h-[50vh]'>
            <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-gray-600 font-medium">Loading...</span>
        </div>
    )
}

export default Spiner
