import useFetch from "../hooks/useFetch";
import { getAllUsers } from "../services/userService";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import Badge from "../components/Badge";

const Users = () => {
    const { data: users, loading, error } = useFetch(getAllUsers);

    return (
        <div className="max-w-5xl mx-auto px-6 py-10">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800">Users</h1>
                <p className="text-slate-500 mt-1">All registered users in the system</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                {loading && <LoadingSpinner />}
                {error   && <p className="p-4 text-red-500 text-sm">{error}</p>}

                {!loading && !error && users?.length === 0 && (
                    <EmptyState icon="👤" title="No users yet" description="Create a user to get started." />
                )}

                {!loading && !error && users && users.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                            <tr className="border-b border-slate-200 bg-slate-50">
                                {["Name", "Email", "Education", "Email Alerts", "Status"].map((h) => (
                                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="border-b border-slate-100 hover:bg-blue-50 transition-colors">
                                    <td className="px-5 py-3 font-medium text-slate-800">{user.name}</td>
                                    <td className="px-5 py-3 text-slate-500">{user.email}</td>
                                    <td className="px-5 py-3">
                                        <Badge label={user.education === "pg" ? "Post Grad" : "Undergrad"} variant="primary" />
                                    </td>
                                    <td className="px-5 py-3">
                                        <Badge
                                            label={user.emailServiceEnabled ? "On" : "Off"}
                                            variant={user.emailServiceEnabled ? "success" : "secondary"}
                                        />
                                    </td>
                                    <td className="px-5 py-3">
                                        {user.status && <Badge label={user.status} variant="info" />}
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

export default Users;