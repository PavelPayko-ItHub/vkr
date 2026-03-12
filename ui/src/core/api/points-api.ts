import { instanceAxios } from "./axios";

export const fetchPoints = async () => {
    const response = await instanceAxios.get('/api/points');
    return response.data;
};

export const fetchUsersPoints = async (userId: string) => {
    const response = await instanceAxios.get(`/api/users/${userId}/points`)
    return response.data;
};