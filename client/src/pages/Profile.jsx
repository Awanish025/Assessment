import React, { useState, useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { singleUsergetfunc } from "../services/Apis"
import { BASE_URL } from '../services/helper'
import moment from "moment"

const Profile = () => {

    const [userprofile, setUserProfile] = useState({});
    const { id } = useParams();

    const userProfileGet = async () => {
        const response = await singleUsergetfunc(id);
        if (response.status === 200) {
            setUserProfile(response.data);
        }
    }

    useEffect(() => {
        userProfileGet();
    }, [id])

    return (
        <>
            <div className="max-w-lg mx-auto px-4 mt-8">
                <div className='bg-white shadow-lg rounded-xl overflow-hidden'>
                    {/* Header gradient */}
                    <div className="h-24 bg-[#7AAACE]"></div>

                    <div className="flex flex-col items-center -mt-12 pb-8 px-6">
                        {/* Profile Image */}
                        <img
                            src={`${BASE_URL}/uploads/${userprofile.profile}`}
                            alt=""
                            className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                        />

                        {/* Name */}
                        <h3 className="mt-3 text-xl font-bold text-gray-900">
                            {userprofile.firstname} {userprofile.lastname}
                        </h3>

                        {/* Details */}
                        <div className="mt-4 space-y-3 w-full">
                            <div className="flex items-center justify-center gap-2 text-gray-600">
                                <i className="fa-solid fa-envelope text-blue-500 w-5"></i>
                                <span className="text-sm">{userprofile.email}</span>
                            </div>
                            <div className="flex items-center justify-center gap-2 text-gray-600">
                                <i className="fa-solid fa-mobile text-blue-500 w-5"></i>
                                <span className="text-sm">{userprofile.mobile}</span>
                            </div>
                            <div className="flex items-center justify-center gap-2 text-gray-600">
                                <i className="fa-solid fa-person text-blue-500 w-5"></i>
                                <span className="text-sm">{userprofile.gender}</span>
                            </div>
                            <div className="flex items-center justify-center gap-2 text-gray-600">
                                <i className="fa-solid fa-location-pin text-blue-500 w-5"></i>
                                <span className="text-sm">{userprofile.location}</span>
                            </div>
                            <div className="flex items-center justify-center gap-2 text-gray-600">
                                <span className="text-sm font-medium">Status:</span>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${userprofile.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                    {userprofile.status}
                                </span>
                            </div>
                            <div className="flex items-center justify-center gap-2 text-gray-500 text-xs">
                                <i className="fa-solid fa-calendar-days text-blue-500 w-5"></i>
                                <span>Created: {moment(userprofile.createdAt).format("DD-MM-YYYY")}</span>
                            </div>
                            <div className="flex items-center justify-center gap-2 text-gray-500 text-xs">
                                <i className="fa-solid fa-calendar-days text-blue-500 w-5"></i>
                                <span>Updated: {userprofile.updatedAt ? moment(userprofile.updatedAt).format("DD-MM-YYYY") : ""}</span>
                            </div>
                        </div>

                        {/* Back button */}
                        <NavLink to="/" className="mt-6 px-6 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors no-underline">
                            ← Back to Home
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
