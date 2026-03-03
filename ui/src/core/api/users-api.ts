import type { IUserCreate } from "core/types/user";
import { instanceAxios } from "./axios";

export const fetchUsers = async () => {
    const response = await instanceAxios.get('/api/users');
    return response.data;
};

export const addUser = async (userData: IUserCreate) => {
    const response = await instanceAxios.post('/api/users', {userData});
    return response.data;
};