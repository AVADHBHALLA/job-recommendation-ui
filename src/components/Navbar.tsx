import { NavLink } from "react-router-dom";

const links = [
    { to: "/",                label: "Dashboard" },
    { to: "/users",           label: "Users" },
    { to: "/create-user",     label: "Create User" },
    { to: "/jobs",            label: "Jobs" },
    { to: "/create-job",      label: "Create Job" },
    { to: "/preferences",     label: "Preferences" },
    { to: "/recommendations", label: "Recommendations" },
];

const Navbar = () => (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">

            {/* Brand */}
            <NavLink to="/" className="text-blue-600 font-bold text-lg no-underline flex items-center gap-2">
                💼 JobMatch
            </NavLink>

            {/* Links */}
            <ul className="flex items-center gap-1 list-none m-0 p-0">
                {links.map(({ to, label }) => (
                    <li key={to}>
                        <NavLink
                            to={to}
                            end={to === "/"}
                            className={({ isActive }) =>
                                `px-3 py-2 rounded-lg text-sm font-medium no-underline transition-colors duration-150
                ${isActive
                                    ? "bg-blue-50 text-blue-600 font-semibold"
                                    : "text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                                }`
                            }
                        >
                            {label}
                        </NavLink>
                    </li>
                ))}
            </ul>

        </div>
    </nav>
);

export default Navbar;