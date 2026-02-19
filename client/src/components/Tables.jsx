import React, { useState, useRef, useEffect } from 'react'
import { BASE_URL } from '../services/helper';
import { NavLink } from 'react-router-dom';
import { statuschangefunc } from "../services/Apis";
import { ToastContainer, toast } from "react-toastify";

const Tables = ({ userdata, deleteUser, userGet, handlePrevious, handleNext, page, pageCount, setPage }) => {

    const [openStatusId, setOpenStatusId] = useState(null);
    const [openActionId, setOpenActionId] = useState(null);
    const dropdownRef = useRef(null);

    const handleChange = async (id, status) => {
        const response = await statuschangefunc(id, status);
        if (response.status === 200) {
            userGet();
            toast.success("Status Updated")
        } else {
            toast.error("error ")
        }
        setOpenStatusId(null);
    }

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpenStatusId(null);
                setOpenActionId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            <div className="mt-0 mb-8" ref={dropdownRef}>
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[700px]">
                            <thead>
                                <tr className="bg-gray-800">
                                    <th className="px-5 py-4 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider">ID</th>
                                    <th className="px-5 py-4 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider">FullName</th>
                                    <th className="px-5 py-4 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider">Email</th>
                                    <th className="px-5 py-4 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider">Gender</th>
                                    <th className="px-5 py-4 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider">Status</th>
                                    <th className="px-5 py-4 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider">Profile</th>
                                    <th className="px-5 py-4 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {
                                    userdata.length > 0 ? userdata.map((element, index) => {
                                        return (
                                            <tr key={element._id || index} className="hover:bg-blue-50/50 transition-colors">
                                                <td className="px-5 py-4 text-sm text-gray-700 font-medium">{index + 1 + (page - 1) * 5}</td>
                                                <td className="px-5 py-4 text-sm text-gray-800 font-medium">{element.firstname + " " + element.lastname}</td>
                                                <td className="px-5 py-4 text-sm text-gray-600">{element.email}</td>
                                                <td className="px-5 py-4 text-sm text-gray-600">{element.gender == "Male" ? "M" : "F"}</td>
                                                <td className="px-5 py-4 text-sm">
                                                    <div className="relative inline-block">
                                                        <button
                                                            onClick={() => setOpenStatusId(openStatusId === element._id ? null : element._id)}
                                                            className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer border-none transition-all ${element.status === "Active"
                                                                ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                                                                : "bg-red-100 text-red-700 hover:bg-red-200"
                                                                }`}
                                                        >
                                                            {element.status} <i className="fa-solid fa-angle-down ml-1 text-[10px]"></i>
                                                        </button>
                                                        {openStatusId === element._id && (
                                                            <div className="absolute top-full left-0 mt-1.5 bg-white rounded-xl shadow-xl border border-gray-200 z-50 min-w-[130px] py-1 animate-in">
                                                                <button onClick={() => handleChange(element._id, "Active")} className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer border-none bg-transparent transition-colors">Active</button>
                                                                <button onClick={() => handleChange(element._id, "InActive")} className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 cursor-pointer border-none bg-transparent transition-colors">InActive</button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-gray-200 p-0.5 bg-white">
                                                        <img src={`${BASE_URL}/uploads/${element.profile}`} alt="img" className="w-full h-full object-cover rounded-full" />
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <div className="relative inline-block">
                                                        <button
                                                            onClick={() => setOpenActionId(openActionId === element._id ? null : element._id)}
                                                            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer border-none transition-colors"
                                                        >
                                                            <i className="fa-solid fa-ellipsis-vertical"></i>
                                                        </button>
                                                        {openActionId === element._id && (
                                                            <div className="absolute right-0 top-full mt-1.5 bg-white rounded-xl shadow-xl border border-gray-200 z-50 min-w-[140px] py-1">
                                                                <NavLink to={`/userprofile/${element._id}`} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 no-underline transition-colors">
                                                                    <i className="fa-solid fa-eye text-green-500 w-4"></i> <span>View</span>
                                                                </NavLink>
                                                                <NavLink to={`/edit/${element._id}`} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 no-underline transition-colors">
                                                                    <i className="fa-solid fa-pen-to-square text-blue-500 w-4"></i> <span>Edit</span>
                                                                </NavLink>
                                                                <button onClick={() => { deleteUser(element._id); setOpenActionId(null); }} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 cursor-pointer border-none bg-transparent transition-colors">
                                                                    <i className="fa-solid fa-trash w-4"></i> <span>Delete</span>
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    }) : <tr><td colSpan="7" className='text-center py-12 text-gray-400 text-sm'>No Data Found</td></tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination */}
                    <div className="flex justify-end items-center px-5 py-4 border-t border-gray-100">
                        <nav className="flex items-center gap-1.5">
                            <button
                                onClick={handlePrevious}
                                disabled={page === 1}
                                className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                            >
                                Previous
                            </button>
                            {
                                Array(pageCount).fill(null).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setPage(index + 1)}
                                        className={`w-9 h-9 text-sm font-medium rounded-lg cursor-pointer border transition-colors ${page === index + 1
                                            ? "bg-blue-500 text-white border-blue-500 shadow-sm"
                                            : "text-gray-600 bg-white border-gray-300 hover:bg-gray-50"
                                            }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))
                            }
                            <button
                                onClick={handleNext}
                                disabled={page === pageCount}
                                className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                            >
                                Next
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Tables
