import api from "./api";
import type { Job, CreateJobDto } from "../types/Job";

export const getAllJobs = async (): Promise<Job[]> => {
    const { data } = await api.get<Job[]>("/job/getAll");
    return data;
};

export const createJob = async (job: CreateJobDto): Promise<Job> => {
    const { data } = await api.post<Job>("/job/create", job);
    return data;
};