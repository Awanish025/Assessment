import React, { useEffect, useState } from 'react'
import Tables from '../components/Tables';
import Spiner from "../components/Spiner";
import { useNavigate } from "react-router-dom"
import { usergetfunc, deletefunc, exporttocsvfunc } from "../services/Apis";
import { toast } from 'react-toastify';

const Home = () => {

    const [userdata, setUserData] = useState([]);
    const [showspin, setShowSpin] = useState(true);
    const [search, setSearch] = useState("");
    const [gender, setGender] = useState("All");
    const [status, setStatus] = useState("All");
    const [sort, setSort] = useState("new");
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);

    const navigate = useNavigate();

    const adduser = () => {
        navigate("/register")
    }

    // get user
    const userGet = async () => {
        const response = await usergetfunc(search, gender, status, sort, page);
        if (response.status === 200) {
            setUserData(response.data.usersdata);
            setPageCount(response.data.Pagination.pageCount)
        }
    }

    // user delete
    const deleteUser = async (id) => {
        const response = await deletefunc(id);
        if (response.status === 200) {
            userGet();
            toast.success("User Deleted Successfully");
        } else {
            toast.error("error")
        }
    }

    // export user
    const exportuser = async () => {
        const response = await exporttocsvfunc();
        if (response.status === 200) {
            window.open(response.data.downloadUrl, "blank")
        } else {
            toast.error("error !")
        }
    }

    // pagination
    const handlePrevious = () => {
        setPage(() => {
            if (page === 1) return page;
            return page - 1
        })
    }

    const handleNext = () => {
        setPage(() => {
            if (page === pageCount) return page;
            return page + 1
        })
    }

    useEffect(() => {
        userGet();
        setTimeout(() => {
            setShowSpin(false)
        }, 1200)
    }, [search, gender, status, sort, page])

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="w-full py-6">

                    {/* Search & Action Buttons */}
                    <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                        {/* Search */}
                        <div className="w-full md:w-2/5">
                            <div className="flex">
                                <input
                                    type="search"
                                    placeholder="Search users..."
                                    className="flex-1 min-w-0 px-4 py-2.5 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm bg-gray-50"
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <button className="px-6 py-2.5 bg-emerald-500 text-white font-medium text-sm rounded-r-lg hover:bg-emerald-600 transition-colors cursor-pointer border-none shadow-sm">
                                    Search
                                </button>
                            </div>
                        </div>
                        {/* Action Buttons */}
                        <div className="flex gap-3 w-full md:w-auto">
                            <button onClick={adduser} className="flex-1 md:flex-none px-6 py-2.5 bg-blue-500 text-white font-medium text-sm rounded-lg hover:bg-blue-600 transition-all hover:-translate-y-0.5 cursor-pointer border-none shadow-sm whitespace-nowrap">
                                <i className="fa-solid fa-plus mr-1.5"></i> Add User
                            </button>
                            <button onClick={exportuser} className="flex-1 md:flex-none px-6 py-2.5 bg-blue-500 text-white font-medium text-sm rounded-lg hover:bg-blue-600 transition-all hover:-translate-y-0.5 cursor-pointer border-none shadow-sm whitespace-nowrap">
                                <i className="fa-solid fa-file-export mr-1.5"></i> Export To Csv
                            </button>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6">
                        {/* Gender Filter */}
                        <div>
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2.5">Filter By Gender</h3>
                            <div className="flex gap-5">
                                {["All", "Male", "Female"].map(g => (
                                    <label key={g} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-blue-600 transition-colors">
                                        <input type="radio" name="gender" value={g} defaultChecked={g === "All"} onChange={(e) => setGender(e.target.value)} className="accent-blue-500 w-4 h-4" />
                                        {g}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Sort */}
                        {/* <div>
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2.5">Sort By</h3>
                            <select onChange={(e) => setSort(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 cursor-pointer bg-gray-50">
                                <option value="new">Newest</option>
                                <option value="old">Oldest</option>
                            </select>
                        </div> */}

                        {/* Status Filter */}
                        <div>
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2.5">Filter By Status</h3>
                            <div className="flex gap-5">
                                {["All", "Active", "InActive"].map(s => (
                                    <label key={s} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-blue-600 transition-colors">
                                        <input type="radio" name="status" value={s} defaultChecked={s === "All"} onChange={(e) => setStatus(e.target.value)} className="accent-blue-500 w-4 h-4" />
                                        {s}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {
                    showspin ? <Spiner /> : <Tables
                        userdata={userdata}
                        deleteUser={deleteUser}
                        userGet={userGet}
                        handlePrevious={handlePrevious}
                        handleNext={handleNext}
                        page={page}
                        pageCount={pageCount}
                        setPage={setPage}
                    />
                }
            </div>
        </>
    )
}

export default Home
