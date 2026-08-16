import { useState } from "react";

function useForm<T>(initialValues: T) {
    const [values, setValues] = useState<T>(initialValues);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setValues((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const reset = () => setValues(initialValues);
    return { values, handleChange, reset, setValues };
}

export default useForm;