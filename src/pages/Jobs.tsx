import { useEffect, useState } from "react";
import type { Job } from "../types/Job";
import { getAllJobs } from "../services/jobService";

const Jobs = () => {

    const [jobs, setJobs] = useState<Job[]>([]);

    useEffect(() => {
        const loadJobs = async () => {
            try {
                const data = await getAllJobs();
                setJobs(data);
            } catch (error) {
                console.error(error);
            }
        };

        loadJobs();
    }, []);

    return (
        <div className="container mt-4">

            <h2>Jobs</h2>

            <table className="table table-bordered">

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
                        <td>{job.yearsOfExperience}</td>
                        <td>{job.minSalary}</td>
                        <td>{job.maxSalary}</td>

                    </tr>

                ))}

                </tbody>

            </table>

        </div>
    );
};

export default Jobs;