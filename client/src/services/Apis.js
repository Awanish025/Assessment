import { commonrequest } from "./ApiCall";
import { BASE_URL } from "./helper";

export const registerfunc = async (data, header) => {
    return await commonrequest("POST", `${BASE_URL}/api/users/register`, data, header);
}

export const usergetfunc = async (search, gender, status, sort, page) => {
    return await commonrequest("GET", `${BASE_URL}/api/users/details?search=${search}&gender=${gender}&status=${status}&sort=${sort}&page=${page}`, "");
}

export const singleUsergetfunc = async (id) => {
    return await commonrequest("GET", `${BASE_URL}/api/users/${id}`, "");
}

export const editfunc = async (id, data, header) => {
    return await commonrequest("PUT", `${BASE_URL}/api/users/edit/${id}`, data, header);
}

export const deletefunc = async (id) => {
    return await commonrequest("DELETE", `${BASE_URL}/api/users/delete/${id}`, {});
}

export const statuschangefunc = async (id, data) => {
    return await commonrequest("PUT", `${BASE_URL}/api/users/status/${id}`, { status: data });
}

export const exporttocsvfunc = async () => {
    return await commonrequest("GET", `${BASE_URL}/api/users/export`, "");
}
