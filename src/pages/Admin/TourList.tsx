import React from "react";
import { MdDelete, MdModeEdit } from 'react-icons/md';
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import './css/TourList.css';

interface Tour {
    id: number;
    title: string;
    category: string;
    image: string;
}

const TourList: React.FC = () => {
    const navigate = useNavigate();

    const { data, refetch, isError: isQueryError, error: queryError } = useQuery('LIST_TOURS', () =>
        axios.get('http://localhost:8080/upload')
    );

    const {
        mutate: deleteTour,
        isError: isMutationError,
        error: mutationError,
        isSuccess,
    } = useMutation((id: number) => axios.delete(`http://localhost:8080/upload/${id}`), {
        onSuccess: () => {
            refetch();
        }
    });

    const getErrorMessage = (error: any) => {
        return error?.response?.data?.message || error?.message || "An unknown error occurred";
    };

    const handleEdit = (id: number) => {
        navigate(`/admin/uploadedit/${id}`);
    };

    return (
        <>
            <div className="tours">
                <h1>Tours</h1>
                {isQueryError && <p className="error">Error fetching tours: {getErrorMessage(queryError)}</p>}
                {isMutationError && <p className="error">Error deleting tour: {getErrorMessage(mutationError)}</p>}
                {isSuccess && <p className="success">Tour deleted successfully!</p>}
                <div className="tourlist">
                    {data?.data?.data?.map((tour: Tour) => (
                        <div key={tour.id} className="tourlist-card flex">
                            <div className="tourlist-img">
                                <img src={tour.image} alt={tour.title} onClick={() => navigate(`/tourview/${tour.id}`, { state: { tour } })}/>
                            </div>
                            <div className="tourlist-info flex">
                                <label className="tlabel">{tour.title}</label>
                                <h2>Category: {tour.category}</h2>
                            </div>
                            <div className="edit-delete">
                                <button onClick={() => deleteTour(tour.id)}>
                                    <MdDelete size="2rem" />
                                </button>
                                <button onClick={() => handleEdit(tour.id)}>
                                    <MdModeEdit size="2rem" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default TourList;
