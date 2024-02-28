import { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import { FaCircleUser } from "react-icons/fa6";
import './css/UserList.css';

interface User {
    id: number;
    fullName: string;
    email: string;
    username: string;
}

const UserList: React.FC = () => {
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { data: users, refetch } = useQuery<User[], Error>('GET_USERS', () =>
        axios.get('http://localhost:8080/users/getAll').then(res => res.data)
    );

    const deleteUser = useMutation((id: number) => axios.delete(`http://localhost:8080/users/${id}`), {
        onSuccess: () => {
            refetch();
            setSuccessMessage('User deleted successfully.');
            setTimeout(() => setSuccessMessage(null), 5000); // Clear success message after 5 seconds
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || error.message || 'An error occurred while deleting the user.';
            setErrorMessage(message);
            setTimeout(() => setErrorMessage(null), 5000);
        }
    });

    return (
        <div className="list-of-users">
            <h1>User List</h1>
            {successMessage && <p className="success">{successMessage}</p>}
            {errorMessage && <p className="error">{errorMessage}</p>}
            <div className="userlist">
                {users?.map((user) => (
                    <div key={user.id} className="userlist-card flex">
                        <span><FaCircleUser size="2rem" /></span>
                        <div className="userlist-info flex">
                            <label className="user-name">
                                Full Name: {user.fullName}<br/>
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
