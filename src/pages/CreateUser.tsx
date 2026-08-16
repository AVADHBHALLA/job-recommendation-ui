import { useState } from "react";
import useForm from "../hooks/useForm";
import { createUser } from "../services/userService";
import FormField from "../components/FormField";
import type { CreateUserDto } from "../types/User";

const initial: CreateUserDto = {
    name: "",
    email: "",
    education: "ug",
    emailServiceEnabled: true,
};

const inputClass = (err?: string) =>
    `w-full px-3 py-2 text-sm border rounded-lg outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500
  ${err ? "border-red-400" : "border-slate-200"}`;

const CreateUser = () => {
    const { values, handleChange, reset } = useForm(initial);
    const [errors, setErrors] = useState<Partial<Record<keyof CreateUserDto, string>>>({});
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const validate = () => {
        const e: typeof errors = {};
        if (!values.name.trim())  e.name  = "Name is required";
        if (!values.email.trim()) e.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(values.email)) e.email = "Enter a valid email";
        return e;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setErrors({});
        setStatus("loading");
        try {
            await createUser(values);
            setStatus("success");
            reset();
        } catch {
            setStatus("error");
        }
    };

    return (
        <div className="max-w-lg mx-auto px-6 py-10">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800">Create User</h1>
                <p className="text-slate-500 mt-1">Register a new user in the system</p>
            </div>

            {status === "success" && (
                <div className="mb-4 px-4 py-3 rounded-lg bg-green-50 text-green-700 border border-green-200 text-sm">
                    ✅ User created successfully!
                </div>
            )}
            {status === "error" && (
                <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 text-red-700 border border-red-200 text-sm">
                    ❌ Failed to create user. Please try again.
                </div>
            )}

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <form onSubmit={handleSubmit} noValidate>

                    <FormField label="Full Name" required error={errors.name}>
                        <input name="name" value={values.name} onChange={handleChange}
                               placeholder="e.g. Rahul Sharma" className={inputClass(errors.name)} />
                    </FormField>

                    <FormField label="Email Address" required error={errors.email}>
                        <input name="email" type="email" value={values.email} onChange={handleChange}
                               placeholder="e.g. rahul@example.com" className={inputClass(errors.email)} />
                    </FormField>

                    <FormField label="Education Level">
                        <select name="education" value={values.education} onChange={handleChange} className={inputClass()}>
                            <option value="ug">Undergraduate</option>
                            <option value="pg">Post Graduate</option>
                        </select>
                    </FormField>

                    <FormField label="Email Notifications">
                        <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-700">
                            <input name="emailServiceEnabled" type="checkbox" checked={values.emailServiceEnabled}
                                   onChange={handleChange} className="w-4 h-4 accent-blue-600" />
                            Enable job alert emails
                        </label>
                    </FormField>

                    <button type="submit" disabled={status === "loading"}
                            className="mt-1 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed">
                        {status === "loading" ? "Creating..." : "Create User"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default CreateUser;