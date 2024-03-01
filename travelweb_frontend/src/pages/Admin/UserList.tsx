import { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import {FaCircleUser} from "react-icons/fa6";
import './css/UserList.css';

interface User {
    id: number;
    fullName: string;
    email: string;
    username: string;
}

const UserList: React.FC = () => {
    const [isFetching, setIsFetching] = useState(false);

    // Fetch users from the API
    const { data: users, refetch } = useQuery('GET_USERS', async () => {
        const response = await axios.get<User[]>('http://localhost:8080/users/getAll');
        return response.data;
    });

    // Mutation for deleting a user
    const deleteUser = useMutation(async (id: number) => {
        setIsFetching(true);
        await axios.delete(`http://localhost:8080/users/${id}`);
    }, {
        onSuccess: () => {
            // Refetch the data after successful deletion
            refetch();
        },
        onSettled: () => {
            setIsFetching(false);
        },
    });

    return (
        <div className="list-of-users">
            <h1>User List</h1>
            <div className="userlist">
                {isFetching && <p>Loading...</p>}
                {!isFetching && users && users.length === 0 && <p>No users found.</p>}
                {users && users.length > 0 && users.map((user) => (
                    <div key={user.id} className="userlist-card flex">
                        <span><FaCircleUser size="2rem" /></span>
                        <div className="userlist-info flex">
                            <label className="user-name">
                                Full Name: {user.fullName}
                                <br/>
                                Username: {user.username}
                                <br/>
                                Email: {user.email}
                            </label>
                        </div>
                        <div className="edit-delete">
                            <button onClick={() => deleteUser.mutate(user.id)}>
                                <MdDelete size="2rem" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserList;
