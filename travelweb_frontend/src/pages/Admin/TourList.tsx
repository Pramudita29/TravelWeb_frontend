import { MdDelete, MdModeEdit } from 'react-icons/md';
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import './css/TourList.css';
import React from "react";

interface Tour {
    id: number;
    title: string;
    category: string;
    image: string;
}

const TourList: React.FC = () => {
    const navigate = useNavigate();

    const { data, refetch } = useQuery({
        queryKey: ['LIST_TOURS'],
        queryFn: () => {
            return axios.get('http://localhost:8080/upload');
        },
    });

    const deleteRecipe = useMutation({
        mutationKey: ['DELETE_TOUR'],
        mutationFn: (id: number) => {
            return axios.delete(`http://localhost:8080/upload/${id}`);
        },
    });

    const handleEdit = (id: number) => {
        navigate(`/admin/uploadedit/${id}`);
    };

    return (
        <>
            {/*<button onClick={() => navigate('/admin/contentCreate')}>Upload Recipe</button>*/}
            <div className="tours">
                <h1>Tours</h1>
            <div className="tourlist">
                {data?.data?.data?.map((tour: Tour) => (
                    <div key={tour.id} className="tourlist-card flex">
                        <div className="tourlist-img">
                            <img src={tour.image} alt={tour.title} onClick={()=>navigate(`/tourview/${tour.id}`, { state: { tour } })}/>
                        </div>
                        <div className="tourlist-info flex">
                            <label className="tlabel">{tour.title}</label>
                            <h2>Category: {tour.category}</h2>
                        </div>
                        <div className="edit-delete">
                            <button onClick={() => deleteRecipe.mutate(tour.id, { onSuccess: refetch })}>
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
