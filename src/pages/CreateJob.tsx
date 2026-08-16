import { useState } from "react";
import useForm from "../hooks/useForm";
import { createJob } from "../services/jobService";
import FormField from "../components/FormField";

const initial = {
    title: "", companyName: "", yearsOfExperience: 0,
    minSalary: 0, maxSalary: 0, skills: "", qualification: "",
    workSetup: "hybrid", employmentType: "full_time",
    country: "", state: "", city: "",
};

const ic = "w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

const SectionTitle = ({ title }: { title: string }) => (
    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 mt-2">{title}</p>
);

const CreateJob = () => {
    const { values, handleChange, reset } = useForm(initial);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        try {
            await createJob({
                title: values.title,
                companyName: values.companyName,
                yearsOfExperience: Number(values.yearsOfExperience),
                minSalary: Number(values.minSalary),
                maxSalary: Number(values.maxSalary),
                jobDescription: {
                    skills: values.skills.split(",").map(s => s.trim()).filter(Boolean),
                    qualification: values.qualification.split(",").map(q => q.trim()).filter(Boolean),
                    workSetup: values.workSetup,
                    employmentType: values.employmentType,
                },
                location: { country: values.country, state: values.state, city: values.city },
            });
            setStatus("success");
            reset();
        } catch {
            setStatus("error");
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-6 py-10">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800">Create Job</h1>
                <p className="text-slate-500 mt-1">Add a new job listing to the system</p>
            </div>

            {status === "success" && (
                <div className="mb-4 px-4 py-3 rounded-lg bg-green-50 text-green-700 border border-green-200 text-sm">
                    ✅ Job created successfully!
                </div>
            )}
            {status === "error" && (
                <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 text-red-700 border border-red-200 text-sm">
                    ❌ Failed to create job. Please try again.
                </div>
            )}

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <form onSubmit={handleSubmit}>

                    <SectionTitle title="Basic Info" />
                    <div className="grid grid-cols-2 gap-4">
                        <FormField label="Job Title" required>
                            <input name="title" value={values.title} onChange={handleChange} placeholder="e.g. Backend Engineer" className={ic} />
                        </FormField>
                        <FormField label="Company Name" required>
                            <input name="companyName" value={values.companyName} onChange={handleChange} placeholder="e.g. Infosys" className={ic} />
                        </FormField>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <FormField label="Experience (yrs)">
                            <input type="number" name="yearsOfExperience" value={values.yearsOfExperience} onChange={handleChange} className={ic} />
                        </FormField>
                        <FormField label="Min Salary (₹)">
                            <input type="number" name="minSalary" value={values.minSalary} onChange={handleChange} className={ic} />
                        </FormField>
                        <FormField label="Max Salary (₹)">
                            <input type="number" name="maxSalary" value={values.maxSalary} onChange={handleChange} className={ic} />
                        </FormField>
                    </div>

                    <hr className="border-slate-100 my-5" />
                    <SectionTitle title="Job Description" />

                    <FormField label="Skills" hint="Comma-separated e.g. Java, Spring Boot, MySQL">
                        <input name="skills" value={values.skills} onChange={handleChange} placeholder="Java, Spring Boot" className={ic} />
                    </FormField>
                    <FormField label="Qualifications" hint="Comma-separated e.g. B.Tech, MCA">
                        <input name="qualification" value={values.qualification} onChange={handleChange} placeholder="B.Tech, MCA" className={ic} />
                    </FormField>

                    <div className="grid grid-cols-2 gap-4">
                        <FormField label="Work Setup">
                            <select name="workSetup" value={values.workSetup} onChange={handleChange} className={ic}>
                                <option value="remote">Remote</option>
                                <option value="hybrid">Hybrid</option>
                                <option value="onsite">Onsite</option>
                            </select>
                        </FormField>
                        <FormField label="Employment Type">
                            <select name="employmentType" value={values.employmentType} onChange={handleChange} className={ic}>
                                <option value="full_time">Full Time</option>
                                <option value="part_time">Part Time</option>
                                <option value="intern">Intern</option>
                                <option value="contract">Contract</option>
                                <option value="freelance">Freelance</option>
                            </select>
                        </FormField>
                    </div>

                    <hr className="border-slate-100 my-5" />
                    <SectionTitle title="Location" />

                    <div className="grid grid-cols-3 gap-4">
                        <FormField label="Country">
                            <input name="country" value={values.country} onChange={handleChange} placeholder="India" className={ic} />
                        </FormField>
                        <FormField label="State">
                            <input name="state" value={values.state} onChange={handleChange} placeholder="Maharashtra" className={ic} />
                        </FormField>
                        <FormField label="City">
                            <input name="city" value={values.city} onChange={handleChange} placeholder="Pune" className={ic} />
                        </FormField>
                    </div>

                    <button type="submit" disabled={status === "loading"}
                            className="mt-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed">
                        {status === "loading" ? "Creating..." : "Create Job"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default CreateJob;