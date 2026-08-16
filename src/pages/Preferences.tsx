import { useState } from "react";
import useFetch from "../hooks/useFetch";
import useForm from "../hooks/useForm";
import { getAllUsers, updateUser } from "../services/userService";
import FormField from "../components/FormField";
import LoadingSpinner from "../components/LoadingSpinner";

const initial = {
    skills: "", experience: "", location: "", company: "",
    minSalary: "", maxSalary: "", workSetup: "REMOTE", employmentType: "FULL_TIME",
};

const ic = "w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

const Preferences = () => {
    const { data: users, loading: usersLoading } = useFetch(getAllUsers);
    const [selectedUserId, setSelectedUserId] = useState("");
    const { values, handleChange, reset } = useForm(initial);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSave = async () => {
        const selectedUser = users?.find((u) => u.id === selectedUserId);
        if (!selectedUser) return;

        const payload = {
            name: selectedUser.name,
            email: selectedUser.email,
            education: selectedUser.education,
            emailServiceEnabled: selectedUser.emailServiceEnabled,
            jobPreferenceFilter: {
                filters: [
                    { field: "skills",         op: "in" as const,      value: values.skills.split(",").map(s => s.trim()).filter(Boolean) },
                    { field: "experience",     op: "in" as const,      value: [values.experience] },
                    { field: "location",       op: "notIn" as const,   value: [values.location] },
                    { field: "company",        op: "notIn" as const,   value: [values.company] },
                    { field: "salary",         op: "between" as const, value: [values.minSalary, values.maxSalary] },
                    { field: "workSetup",      op: "in" as const,      value: [values.workSetup] },
                    { field: "employmentType", op: "in" as const,      value: [values.employmentType] },
                ],
            },
        };

        setStatus("loading");
        try {
            await updateUser(selectedUserId, payload);
            setStatus("success");
        } catch {
            setStatus("error");
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-6 py-10">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800">User Preferences</h1>
                <p className="text-slate-500 mt-1">Set job filters to improve recommendations</p>
            </div>

            {status === "success" && (
                <div className="mb-4 px-4 py-3 rounded-lg bg-green-50 text-green-700 border border-green-200 text-sm">
                    ✅ Preferences saved!
                </div>
            )}
            {status === "error" && (
                <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 text-red-700 border border-red-200 text-sm">
                    ❌ Failed to save. Try again.
                </div>
            )}

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                {usersLoading ? <LoadingSpinner /> : (
                    <>
                        <FormField label="Select User" required>
                            <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)} className={ic}>
                                <option value="">— Choose a user —</option>
                                {users?.map((u) => (
                                    <option key={u.id} value={u.id}>{u.name}</option>
                                ))}
                            </select>
                        </FormField>

                        <hr className="border-slate-100 my-5" />

                        <FormField label="Preferred Skills" hint="Comma-separated e.g. React, Node.js">
                            <input name="skills" value={values.skills} onChange={handleChange} placeholder="React, TypeScript" className={ic} />
                        </FormField>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField label="Work Setup">
                                <select name="workSetup" value={values.workSetup} onChange={handleChange} className={ic}>
                                    <option value="REMOTE">Remote</option>
                                    <option value="HYBRID">Hybrid</option>
                                    <option value="ONSITE">Onsite</option>
                                </select>
                            </FormField>
                            <FormField label="Employment Type">
                                <select name="employmentType" value={values.employmentType} onChange={handleChange} className={ic}>
                                    <option value="FULL_TIME">Full Time</option>
                                    <option value="PART_TIME">Part Time</option>
                                    <option value="INTERN">Intern</option>
                                    <option value="CONTRACT">Contract</option>
                                    <option value="FREELANCE">Freelance</option>
                                </select>
                            </FormField>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField label="Min Salary (₹)">
                                <input name="minSalary" value={values.minSalary} onChange={handleChange} placeholder="500000" className={ic} />
                            </FormField>
                            <FormField label="Max Salary (₹)">
                                <input name="maxSalary" value={values.maxSalary} onChange={handleChange} placeholder="1500000" className={ic} />
                            </FormField>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField label="Experience" hint="e.g. 2 or 2-5">
                                <input name="experience" value={values.experience} onChange={handleChange} placeholder="2" className={ic} />
                            </FormField>
                            <FormField label="Location to Avoid">
                                <input name="location" value={values.location} onChange={handleChange} placeholder="Delhi" className={ic} />
                            </FormField>
                        </div>

                        <FormField label="Company to Avoid">
                            <input name="company" value={values.company} onChange={handleChange} placeholder="XYZ Corp" className={ic} />
                        </FormField>

                        <div className="flex gap-3 mt-2">
                            <button
                                onClick={handleSave}
                                disabled={!selectedUserId || status === "loading"}
                                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === "loading" ? "Saving..." : "Save Preferences"}
                            </button>
                            <button onClick={reset}
                                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-medium rounded-lg transition">
                                Reset
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Preferences;