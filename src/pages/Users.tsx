import { useEffect, useState } from "react";
import type { User } from "../types/User";
import { getAllUsers } from "../services/userService";

const Users = () => {

    const [users, setUsers] = useState<User[]>([]);


    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await getAllUsers();
                setUsers(data);
            } catch (error) {
                console.error(error);
            }
        };
        loadUsers();
    }, []);

    return (
        <div className="container mt-4">

            <h2>Users</h2>

            <table className="table table-bordered">

                <thead>

                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Education</th>
                </tr>

                </thead>

                <tbody>

                {users.map((user) => (

                    <tr key={user.id}>

                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.education}</td>

                    </tr>

                ))}

                </tbody>

            </table>

        </div>
    );
}

export default Users;