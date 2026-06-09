import api from "./api";
import type { User } from "../types/User";
import type { Job } from "../types/Job";

export const getAllUsers = async (): Promise<User[]> => {
    const response = await api.get<User[]>("/users/getAll");
    return response.data;
};

export const createUser = async (user: any) => {
    const response = await api.post("/users/create", user);
    return response.data;
};

export const getMatchingJobs = async (
    userId: string
): Promise<Job[]> => {

    const response = await api.get<Job[]>(
        `/users/matchJob/${userId}`
    );

    return response.data;
};

export const updateUser = async (
    userId: string,
    user: any
) => {
    const response = await api.put(
        `/users/update/${userId}`,
        user
    );

    return response.data;
};