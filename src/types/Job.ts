export interface JobLocation {
    country: string;
    state: string;
    city: string;
    street?: string;
    pinCode?: string;
}

export interface JobDescription {
    skills: string[];
    qualification: string[];
    workSetup: "remote" | "hybrid" | "onsite" | string;
    employmentType: "full_time" | "part_time" | "intern" | "contract" | "freelance" | string;
}

export interface Job {
    id: string;
    title: string;
    companyName: string;
    yearsOfExperience: number;
    minSalary: number;
    maxSalary: number;
    jobDescription?: JobDescription;
    location?: JobLocation;
}

export type CreateJobDto = Omit<Job, "id">;