import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Job Recommendation
                </Link>

                <div className="navbar-nav ms-auto">
                    <Link className="nav-link" to="/">
                        Dashboard
                    </Link>

                    <Link className="nav-link" to="/users">
                        Users
                    </Link>

                    <Link className="nav-link" to="/create-user">
                        Create User
                    </Link>

                    <Link className="nav-link" to="/jobs">
                        Jobs
                    </Link>

                    <Link className="nav-link" to="/create-job">
                        Create Job
                    </Link>

                    <Link className="nav-link" to="/preferences">
                        Preferences
                    </Link>

                    <Link className="nav-link" to="/recommendations">
                        Recommendations
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;