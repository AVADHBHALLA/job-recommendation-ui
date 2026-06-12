import { useState } from "react";
import { createUser } from "../services/userService";

const CreateUser = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [education, setEducation] = useState("ug");
    const [emailServiceEnabled, setEmailServiceEnabled] = useState(true);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const user = {
            name,
            email,
            education,
            emailServiceEnabled
        };

        try {

            await createUser(user);

            alert("User Created Successfully");

            setName("");
            setEmail("");
            setEducation("ug");
            setEmailServiceEnabled(true);

        } catch (error) {

            console.error(error);
            alert("Failed to create user");

        }
    };

    return (
        <div className="container mt-4">

            <h2>Create User</h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">

                    <label>Name</label>

                    <input
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                </div>

                <div className="mb-3">

                    <label>Email</label>

                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                </div>

                <div className="mb-3">

                    <label>Education</label>

                    <select
                        className="form-control"
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
                    >
                        <option value="ug">
                            Undergraduate
                        </option>

                        <option value="pg">
                            Post Graduate
                        </option>

                    </select>

                </div>

                <div className="form-check mb-3">

                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={emailServiceEnabled}
                        onChange={(e) =>
                            setEmailServiceEnabled(e.target.checked)
                        }
                    />

                    <label className="form-check-label">
                        Enable Email Notifications
                    </label>

                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Create User
                </button>

            </form>

        </div>
    );
};

export default CreateUser;