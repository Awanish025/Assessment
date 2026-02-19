import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom"
import { singleUsergetfunc, editfunc } from "../services/Apis";
import { BASE_URL } from '../services/helper';

const Edit = () => {

    const [inputdata, setInputData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        mobile: "",
        gender: "Male",
        location: ""
    });

    const [status, setStatus] = useState("Active");
    const [imgdata, setImgdata] = useState("");
    const [image, setImage] = useState("");
    const [preview, setPreview] = useState("");

    const { id } = useParams();
    const navigate = useNavigate();

    const setInputValue = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputdata, [name]: value })
    }

    const setStatusValue = (e) => {
        setStatus(e.value)
    }

    const setProfile = (e) => {
        setImage(e.target.files[0])
    }

    const userProfileGet = async () => {
        const response = await singleUsergetfunc(id);
        if (response.status === 200) {
            setInputData(response.data);
            setStatus(response.data.status);
            setImgdata(response.data.profile);
        }
    }

    const submitUserData = async (e) => {
        e.preventDefault();

        const { firstname, lastname, email, mobile, gender, location } = inputdata;

        if (firstname === "") {
            toast.error("First name is Required !")
        } else if (lastname === "") {
            toast.error("Last name is Required !")
        } else if (email === "") {
            toast.error("Email is Required !")
        } else if (!email.includes("@")) {
            toast.error("Enter Valid Email !")
        } else if (mobile === "") {
            toast.error("Mobile is Required !")
        } else if (mobile.length > 10) {
            toast.error("Enter Valid Mobile!")
        } else if (gender === "") {
            toast.error("Gender is Required !")
        } else if (status === "") {
            toast.error("Status is Required !")
        } else if (location === "") {
            toast.error("Location is Required !")
        } else {
            const data = new FormData();
            data.append("firstname", firstname)
            data.append("lastname", lastname)
            data.append("email", email)
            data.append("mobile", mobile)
            data.append("gender", gender)
            data.append("status", status)
            data.append("user_profile", image || imgdata)
            data.append("location", location)

            const config = {
                "Content-Type": "multipart/form-data"
            }

            const response = await editfunc(id, data, config);

            if (response.status === 200) {
                navigate("/");
            }
        }
    }

    useEffect(() => {
        userProfileGet();
    }, [id])

    useEffect(() => {
        if (image) {
            setPreview(URL.createObjectURL(image))
        }
    }, [image])

    const options = [
        { value: 'Active', label: 'Active' },
        { value: 'InActive', label: 'InActive' },
    ];

    return (
        <>
            <div className="max-w-3xl mx-auto px-4">
                <h2 className='text-center mt-4 text-xl font-semibold text-gray-800'>Update Your Details</h2>
                <div className='bg-white shadow-lg mt-4 p-6 rounded-xl'>
                    <div className="text-center">
                        <img src={image ? preview : `${BASE_URL}/uploads/${imgdata}`} alt="img" className="w-12 h-12 rounded-full object-cover mx-auto" />
                    </div>

                    <form className='mt-6'>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">First name</label>
                                <input type="text" name='firstname' value={inputdata.firstname} onChange={setInputValue} placeholder='Enter FirstName' className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                                <input type="text" name='lastname' value={inputdata.lastname} onChange={setInputValue} placeholder='Enter LastName' className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
                                <input type="email" name='email' value={inputdata.email} onChange={setInputValue} placeholder='Enter Email' className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Mobile</label>
                                <input type="text" name='mobile' value={inputdata.mobile} onChange={setInputValue} placeholder='Enter Mobile' className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Select Your Gender</label>
                                <div className="flex gap-4 mt-1">
                                    <label className="flex items-center gap-1.5 text-sm text-gray-700 cursor-pointer">
                                        <input type="radio" name="gender" value="Male" checked={inputdata.gender === "Male"} onChange={setInputValue} className="accent-blue-500" />
                                        Male
                                    </label>
                                    <label className="flex items-center gap-1.5 text-sm text-gray-700 cursor-pointer">
                                        <input type="radio" name="gender" value="Female" checked={inputdata.gender === "Female"} onChange={setInputValue} className="accent-blue-500" />
                                        Female
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Select Your Status</label>
                                <Select options={options} value={options.find(o => o.value === status)} onChange={setStatusValue} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Select Your Profile</label>
                                <input type="file" name='user_profile' onChange={setProfile} className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Enter Your Location</label>
                                <input type="text" name='location' value={inputdata.location} onChange={setInputValue} placeholder='Enter Your Location' className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" />
                            </div>
                        </div>
                        <button type="submit" onClick={submitUserData} className="w-full mt-6 py-2.5 bg-blue-500 text-white font-medium text-sm rounded-lg hover:bg-blue-600 transition-all cursor-pointer border-none">
                            Submit
                        </button>
                    </form>
                </div>
                <ToastContainer position="top-center" />
            </div>
        </>
    )
}

export default Edit
