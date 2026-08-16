import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { getAllUsers, getMatchingJobs } from "../services/userService";
import type { Job } from "../types/Job";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import Badge from "../components/Badge";

const formatSalary = (n: number) =>
    n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${n.toLocaleString()}`;

const Recommendations = () => {
    const { data: users, loading: usersLoading } = useFetch(getAllUsers);
    const [selectedUserId, setSelectedUserId] = useState("");
    const [jobs, setJobs]         = useState<Job[]>([]);
    const [fetching, setFetching] = useState(false);
    const [searched, setSearched] = useState(false);

    const fetchRecommendations = async () => {
        if (!selectedUserId) return;
        setFetching(true);
        setSearched(true);
        try {
            const data = await getMatchingJobs(selectedUserId);
            setJobs(data);
        } catch {
            setJobs([]);
        } finally {
            setFetching(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-6 py-10">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800">Job Recommendations</h1>
                <p className="text-slate-500 mt-1">Find jobs matched to a user's preferences</p>
            </div>

            {/* Selector */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6 flex flex-col sm:flex-row gap-4 items-end shadow-sm">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Select User</label>
                    <select
                        value={selectedUserId}
                        onChange={(e) => { setSelectedUserId(e.target.value); setSearched(false); }}
                        disabled={usersLoading}
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">— Choose a user —</option>
                        {users?.map((u) => (
                            <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={fetchRecommendations}
                    disabled={!selectedUserId || fetching}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                    {fetching ? "Searching..." : "🔍 Get Recommendations"}
                </button>
            </div>

            {/* Results */}
            {fetching && <LoadingSpinner />}

            {!fetching && searched && jobs.length === 0 && (
                <EmptyState icon="🔍" title="No matches found" description="Try updating the user's preferences." />
            )}

            {!fetching && jobs.length > 0 && (
                <>
                    <p className="text-sm text-slate-500 mb-4">
                        Found <span className="font-semibold text-slate-700">{jobs.length}</span> matching job{jobs.length > 1 ? "s" : ""}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {jobs.map((job) => (
                            <div key={job.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">

                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-bold text-slate-800">{job.title}</h3>
                                        <p className="text-sm text-slate-500">{job.companyName}</p>
                                    </div>
                                    {job.jobDescription?.workSetup && (
                                        <Badge label={job.jobDescription.workSetup} variant="success" />
                                    )}
                                </div>

                                <div className="text-sm text-slate-600 space-y-1 mt-3">
                                    <div>💰 {formatSalary(job.minSalary)} – {formatSalary(job.maxSalary)}</div>
                                    <div>📅 {job.yearsOfExperience}+ yrs experience</div>
                                    {job.location && (
                                        <div>📍 {[job.location.city, job.location.state].filter(Boolean).join(", ")}</div>
                                    )}
                                </div>

                                {Array.isArray(job?.jobDescription?.skills) &&
                                    job.jobDescription.skills.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mt-3">
                                            {job.jobDescription.skills.slice(0, 4).map((s) => (
                                                <span
                                                    key={s}
                                                    className="bg-blue-50 text-blue-600 rounded-full px-2.5 py-0.5 text-xs font-medium"
                                                >
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    )
                                }

                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Recommendations;

