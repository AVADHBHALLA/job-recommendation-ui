import api from "./api";
import type { User, CreateUserDto, UpdateUserDto } from "../types/User";
import type { Job } from "../types/Job";

export const getAllUsers = async (): Promise<User[]> => {
    const { data } = await api.get<User[]>("/users/getAll");
    return data;
};

export const createUser = async (user: CreateUserDto): Promise<User> => {
    const { data } = await api.post<User>("/users/create", user);
    return data;
};

export const getMatchingJobs = async (userId: string): Promise<Job[]> => {
    const { data } = await api.get<Job[]>(`/users/matchJob/${userId}`);
    return data;
};

export const updateUser = async (userId: string, user: UpdateUserDto): Promise<User> => {
    const { data } = await api.put<User>(`/users/update/${userId}`, user);
    return data;
};