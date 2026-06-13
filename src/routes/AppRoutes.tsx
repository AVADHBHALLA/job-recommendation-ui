import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Jobs from "../pages/Jobs";
import Recommendations from "../pages/Recommendations";
import CreateUser from "../pages/CreateUser";
import CreateJob from "../pages/CreateJob";
import Preferences from "../pages/Preferences";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/create-user" element={<CreateUser />}/>
            <Route path="/create-job" element={<CreateJob />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/preferences" element={<Preferences />} />
        </Routes>
    );
}

export default AppRoutes;