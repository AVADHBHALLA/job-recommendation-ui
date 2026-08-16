export interface JobPreferenceFilterItem {
    field: string;
    op: "in" | "notIn" | "between" | "eq";
    value: string | string[];
}

export interface JobPreferenceFilter {
    filters: JobPreferenceFilterItem[];
}

export interface User {
    id: string;
    name: string;
    email: string;
    education: "ug" | "pg" | string;
    emailServiceEnabled: boolean;
    status?: string;
    jobPreferenceFilter?: JobPreferenceFilter;
}

export type CreateUserDto = Omit<User, "id" | "status" | "jobPreferenceFilter">;
export type UpdateUserDto = Omit<User, "id">;