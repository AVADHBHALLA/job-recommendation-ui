import useFetch from "../hooks/useFetch";
import { getAllUsers } from "../services/userService";
import { getAllJobs }  from "../services/jobService";
import LoadingSpinner  from "../components/LoadingSpinner";

const Dashboard = () => {
    const { data: users, loading: uLoading } = useFetch(getAllUsers);
    const { data: jobs,  loading: jLoading } = useFetch(getAllJobs);

    const stats = [
        { label: "Total Users",       value: users?.length ?? "—",                                    icon: "👤", bg: "bg-blue-50",   text: "text-blue-600"  },
        { label: "Total Jobs",        value: jobs?.length  ?? "—",                                    icon: "💼", bg: "bg-green-50",  text: "text-green-600" },
        { label: "Email Alerts On",   value: users?.filter(u => u.emailServiceEnabled).length ?? "—", icon: "📧", bg: "bg-cyan-50",   text: "text-cyan-600"  },
        { label: "Active Matches",    value: "—",                                                      icon: "🎯", bg: "bg-yellow-50", text: "text-yellow-600"},
    ];

    return (
        <div className="max-w-5xl mx-auto px-6 py-10">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
                <p className="text-slate-500 mt-1">Welcome to the Job Recommendation System</p>
            </div>

            {/* Stat cards */}
            {uLoading || jLoading ? <LoadingSpinner /> : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {stats.map((s) => (
                        <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4 shadow-sm">
                            <div className={`w-11 h-11 rounded-lg flex items-center justify-center text-xl ${s.bg}`}>
                                {s.icon}
                            </div>
                            <div>
                                <div className={`text-2xl font-bold ${s.text}`}>{s.value}</div>
                                <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Quick start */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <h2 className="text-base font-bold text-slate-700 mb-3">🚀 Quick Start</h2>
                <ol className="list-decimal list-inside text-slate-600 text-sm space-y-2">
                    <li>Create a <span className="font-semibold text-blue-600">User</span> account</li>
                    <li>Add <span className="font-semibold text-green-600">Jobs</span> to the system</li>
                    <li>Set <span className="font-semibold text-yellow-600">Preferences</span> for the user</li>
                    <li>View <span className="font-semibold text-cyan-600">Recommendations</span> matched to the user</li>
                </ol>
            </div>

        </div>
    );
};

export default Dashboard;