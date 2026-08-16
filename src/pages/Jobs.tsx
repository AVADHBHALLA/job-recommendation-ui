import useFetch from "../hooks/useFetch";
import { getAllJobs } from "../services/jobService";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import Badge from "../components/Badge";

const formatSalary = (n: number) =>
    n >= 100000 ? `${(n / 100000).toFixed(1)}L` : `${n.toLocaleString()}`;

const Jobs = () => {
    const { data: jobs, loading, error } = useFetch(getAllJobs);

    return (
        <div className="max-w-5xl mx-auto px-6 py-10">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800">Jobs</h1>
                <p className="text-slate-500 mt-1">All available job listings</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                {loading && <LoadingSpinner />}
                {error   && <p className="p-4 text-red-500 text-sm">{error}</p>}

                {!loading && !error && jobs?.length === 0 && (
                    <EmptyState icon="💼" title="No jobs yet" description="Create a job to get started." />
                )}

                {!loading && !error && jobs && jobs.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                            <tr className="border-b border-slate-200 bg-slate-50">
                                {["Title", "Company", "Exp", "Salary Range", "Setup", "Skills"].map((h) => (
                                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {jobs.map((job) => (
                                <tr key={job.id} className="border-b border-slate-100 hover:bg-blue-50 transition-colors">
                                    <td className="px-5 py-3 font-semibold text-slate-800">{job.title}</td>
                                    <td className="px-5 py-3 text-slate-500">{job.companyName}</td>
                                    <td className="px-5 py-3 text-slate-600">{job.yearsOfExperience}+ yrs</td>
                                    <td className="px-5 py-3 text-slate-600">{formatSalary(job.minSalary)} – {formatSalary(job.maxSalary)}</td>
                                    <td className="px-5 py-3">
                                        {job.jobDescription?.workSetup && (
                                            <Badge label={job.jobDescription.workSetup} variant="success" />
                                        )}
                                    </td>
                                    <td className="px-5 py-3">
                                        <div className="flex flex-wrap gap-1">
                                            {job.jobDescription?.skills?.slice(0, 3).map((s) => (
                                                <span key={s} className="bg-blue-50 text-blue-600 rounded-full px-2.5 py-0.5 text-xs font-medium">
                            {s}
                          </span>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Jobs;