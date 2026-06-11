import api from "./api";
import type { Job } from "../types/Job";

export const getAllJobs = async (): Promise<Job[]> => {
    const response = await api.get<Job[]>("/job/getAll");
    return response.data;
};

export const createJob = async (job: any) => {
    const response = await api.post("/job/create", job);
    return response.data;
};