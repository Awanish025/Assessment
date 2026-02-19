import React from 'react'
import { NavLink } from "react-router-dom"

const Headers = () => {
    return (
        <nav className="h-14 bg-linear-to-r from-gray-800 to-gray-900 shadow-lg flex items-center justify-center">
            <div className="max-w-7xl mx-auto px-4 w-full flex justify-center">
                <NavLink to="/" className="text-white no-underline text-sm md:text-base font-semibold tracking-wide">
                    MERN stack developer practical task
                </NavLink>
            </div>
        </nav>
    )
}

export default Headers
