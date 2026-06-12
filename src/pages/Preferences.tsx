import { useEffect, useState } from "react";
import { getAllUsers, updateUser } from "../services/userService";
import type { User } from "../types/User";

const Preferences = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [selectedUserId, setSelectedUserId] = useState("");

    const [skills, setSkills] = useState("");
    const [experience, setExperience] = useState("");

    const [location, setLocation] = useState("");
    const [company, setCompany] = useState("");

    const [minSalary, setMinSalary] = useState("");
    const [maxSalary, setMaxSalary] = useState("");

    const [workSetup, setWorkSetup] = useState("REMOTE");
    const [employmentType, setEmploymentType] = useState("FULL_TIME");

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await getAllUsers();
                setUsers(data);
            } catch (error) {
                console.error(error);
            }
        };
        loadUsers();
    }, []);



    const handleSave = async () => {

        const selectedUser = users.find(
            user => user.id === selectedUserId
        );

        if (!selectedUser) {
            alert("Select User");
            return;
        }

        const payload = {
            name: selectedUser.name,
            email: selectedUser.email,
            education: selectedUser.education,
            emailServiceEnabled:
            selectedUser.emailServiceEnabled,

            jobPreferenceFilter: {
                filters: [
                    {
                        field: "skills",
                        op: "in",
                        value: skills
                            .split(",")
                            .map(skill => skill.trim())
                    },
                    {
                        field: "experience",
                        op: "in",
                        value: [experience]
                    },
                    {
                        field: "location",
                        op: "notIn",
                        value: [location]
                    },
                    {
                        field: "company",
                        op: "notIn",
                        value: [company]
                    },
                    {
                        field: "salary",
                        op: "between",
                        value: [minSalary, maxSalary]
                    },
                    {
                        field: "workSetup",
                        op: "in",
                        value: [workSetup]
                    },
                    {
                        field: "employmentType",
                        op: "in",
                        value: [employmentType]
                    }
                ]
            }
        };

        try {

            await updateUser(
                selectedUserId,
                payload
            );

            alert("Preferences Saved");

        } catch (error) {

            console.error(error);
            alert("Failed to save preferences");

        }
    };

    return (
        <div className="container mt-4">

            <h2>User Preferences</h2>

            <div className="mb-3">

                <label>Select User</label>

                <select
                    className="form-control"
                    value={selectedUserId}
                    onChange={(e) =>
                        setSelectedUserId(e.target.value)
                    }
                >

                    <option value="">
                        Select User
                    </option>

                    {users.map(user => (

                        <option
                            key={user.id}
                            value={user.id}
                        >
                            {user.name}
                        </option>

                    ))}

                </select>

            </div>

            <div className="mb-3">

                <label>
                    Skills (comma separated)
                </label>

                <input
                    className="form-control"
                    value={skills}
                    onChange={(e) =>
                        setSkills(e.target.value)
                    }
                />

            </div>

            <div className="mb-3">

                <label>
                    Experience
                </label>

                <input
                    className="form-control"
                    value={experience}
                    onChange={(e) =>
                        setExperience(e.target.value)
                    }
                />

            </div>

            <div className="mb-3">

                <label>Location To Avoid</label>

                <input
                    className="form-control"
                    value={location}
                    onChange={(e) =>
                        setLocation(e.target.value)
                    }
                />

            </div>

            <div className="mb-3">

                <label>Company To Avoid</label>

                <input
                    className="form-control"
                    value={company}
                    onChange={(e) =>
                        setCompany(e.target.value)
                    }
                />

            </div>

            <div className="mb-3">

                <label>Minimum Salary</label>

                <input
                    className="form-control"
                    value={minSalary}
                    onChange={(e) =>
                        setMinSalary(e.target.value)
                    }
                />

            </div>

            <div className="mb-3">

                <label>Maximum Salary</label>

                <input
                    className="form-control"
                    value={maxSalary}
                    onChange={(e) =>
                        setMaxSalary(e.target.value)
                    }
                />

            </div>

            <div className="mb-3">

                <label>Work Setup</label>

                <select
                    className="form-control"
                    value={workSetup}
                    onChange={(e) =>
                        setWorkSetup(e.target.value)
                    }
                >

                    <option value="REMOTE">
                        Remote
                    </option>

                    <option value="HYBRID">
                        Hybrid
                    </option>

                    <option value="ONSITE">
                        Onsite
                    </option>

                </select>

            </div>

            <div className="mb-3">

                <label>Employment Type</label>

                <select
                    className="form-control"
                    value={employmentType}
                    onChange={(e) =>
                        setEmploymentType(e.target.value)
                    }
                >

                    <option value="FULL_TIME">
                        Full Time
                    </option>

                    <option value="PART_TIME">
                        Part Time
                    </option>

                    <option value="INTERN">
                        Intern
                    </option>

                    <option value="CONTRACT">
                        Contract
                    </option>

                    <option value="FREELANCE">
                        Freelance
                    </option>

                </select>

            </div>

            <button
                className="btn btn-primary"
                onClick={handleSave}
            >
                Save Preferences
            </button>

        </div>
    );
};

export default Preferences;