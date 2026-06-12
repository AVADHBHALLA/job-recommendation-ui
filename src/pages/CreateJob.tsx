import { useState } from "react";
import { createJob } from "../services/jobService";

const CreateJob = () => {

    const [title, setTitle] = useState("");
    const [companyName, setCompanyName] = useState("");

    const [yearOfExperience, setYearOfExperience] = useState(0);

    const [minSalary, setMinSalary] = useState(0);
    const [maxSalary, setMaxSalary] = useState(0);

    const [skills, setSkills] = useState("");
    const [qualification, setQualification] = useState("");

    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");

    const [workSetup, setWorkSetup] = useState("hybrid");
    const [employmentType, setEmploymentType] = useState("full_time");

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        const job = {

            title,
            companyName,
            yearOfExperience,
            minSalary,
            maxSalary,

            jobDescription: {

                skills: skills.split(",").map(s => s.trim()),

                qualification: qualification
                    .split(",")
                    .map(q => q.trim()),

                workSetup,

                employmentType

            },

            location: {

                country,
                state,
                city,

                street: "",
                pinCode: ""

            }
        };

        try {

            await createJob(job);

            alert("Job Created Successfully");

            setTitle("");
            setCompanyName("");
            setYearOfExperience(0);
            setMinSalary(0);
            setMaxSalary(0);

            setSkills("");
            setQualification("");

            setCountry("");
            setState("");
            setCity("");

            setWorkSetup("hybrid");
            setEmploymentType("full_time");

        } catch (error) {

            console.error(error);
            alert("Failed To Create Job");

        }
    };

    return (
        <div className="container mt-4">

            <h2>Create Job</h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label>Job Title</label>

                    <input
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label>Company Name</label>

                    <input
                        className="form-control"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label>Experience (Years)</label>

                    <input
                        type="number"
                        className="form-control"
                        value={yearOfExperience}
                        onChange={(e) =>
                            setYearOfExperience(
                                Number(e.target.value)
                            )
                        }
                    />
                </div>

                <div className="mb-3">
                    <label>Minimum Salary</label>

                    <input
                        type="number"
                        className="form-control"
                        value={minSalary}
                        onChange={(e) =>
                            setMinSalary(Number(e.target.value))
                        }
                    />
                </div>

                <div className="mb-3">
                    <label>Maximum Salary</label>

                    <input
                        type="number"
                        className="form-control"
                        value={maxSalary}
                        onChange={(e) =>
                            setMaxSalary(Number(e.target.value))
                        }
                    />
                </div>

                <div className="mb-3">
                    <label>Skills (comma separated)</label>

                    <input
                        className="form-control"
                        placeholder="Java, Spring Boot, Hibernate"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label>Qualifications</label>

                    <input
                        className="form-control"
                        placeholder="B.Tech, MCA"
                        value={qualification}
                        onChange={(e) =>
                            setQualification(e.target.value)
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
                        <option value="remote">
                            Remote
                        </option>

                        <option value="hybrid">
                            Hybrid
                        </option>

                        <option value="onsite">
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
                        <option value="full_time">
                            Full Time
                        </option>

                        <option value="part_time">
                            Part Time
                        </option>

                        <option value="intern">
                            Intern
                        </option>

                        <option value="contract">
                            Contract
                        </option>

                        <option value="freelance">
                            Freelance
                        </option>
                    </select>
                </div>

                <hr />

                <h4>Location</h4>

                <div className="mb-3">
                    <label>Country</label>

                    <input
                        className="form-control"
                        value={country}
                        onChange={(e) =>
                            setCountry(e.target.value)
                        }
                    />
                </div>

                <div className="mb-3">
                    <label>State</label>

                    <input
                        className="form-control"
                        value={state}
                        onChange={(e) =>
                            setState(e.target.value)
                        }
                    />
                </div>

                <div className="mb-3">
                    <label>City</label>

                    <input
                        className="form-control"
                        value={city}
                        onChange={(e) =>
                            setCity(e.target.value)
                        }
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Create Job
                </button>

            </form>

        </div>
    );
};

export default CreateJob;