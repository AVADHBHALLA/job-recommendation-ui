import { useEffect, useState } from "react";
import type { User } from "../types/User";
import type { Job } from "../types/Job";

import { getAllUsers, getMatchingJobs }
    from "../services/userService";

const Recommendations = () => {

    const [users, setUsers] = useState<User[]>([]);

    const [selectedUserId, setSelectedUserId]
        = useState("");

    const [jobs, setJobs] = useState<Job[]>([]);

    useEffect(() => {

        const loadUsers = async () => {

            try {

                const data =
                    await getAllUsers();

                setUsers(data);

            } catch (error) {

                console.error(error);

            }
        };

        loadUsers();

    }, []);

    const fetchRecommendations = async () => {

        try {

            const data =
                await getMatchingJobs(
                    selectedUserId
                );

            setJobs(data);

        } catch (error) {

            console.error(error);

            alert(
                "Failed to load recommendations"
            );
        }
    };

    return (

        <div className="container mt-4">

            <h2>
                Job Recommendations
            </h2>

            <div className="mb-3">

                <label>
                    Select User
                </label>

                <select
                    className="form-control"
                    value={selectedUserId}
                    onChange={(e) =>
                        setSelectedUserId(
                            e.target.value
                        )
                    }
                >

                    <option value="">
                        Select User
                    </option>

                    {users.map((user) => (

                        <option
                            key={user.id}
                            value={user.id}
                        >
                            {user.name}
                        </option>

                    ))}

                </select>

            </div>

            <button
                className="btn btn-primary mb-3"
                onClick={
                    fetchRecommendations
                }
            >
                Get Recommendations
            </button>

            <table
                className="table table-bordered"
            >

                <thead>

                <tr>

                    <th>Title</th>

                    <th>Company</th>

                    <th>Experience</th>

                    <th>Min Salary</th>

                    <th>Max Salary</th>

                </tr>

                </thead>

                <tbody>

                {jobs.map((job) => (

                    <tr key={job.id}>

                        <td>{job.title}</td>

                        <td>{job.companyName}</td>

                        <td>
                            {job.yearsOfExperience}
                        </td>

                        <td>
                            {job.minSalary}
                        </td>

                        <td>
                            {job.maxSalary}
                        </td>

                    </tr>

                ))}

                </tbody>

            </table>

        </div>

    );
};

export default Recommendations;