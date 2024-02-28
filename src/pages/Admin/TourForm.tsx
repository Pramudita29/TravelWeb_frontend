import {useMutation, useQuery} from "react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import './css/TourForm.css';
import { useNavigate, useParams } from "react-router-dom";
import {useEffect} from "react";
import Header from "../components/Header.tsx";

const TourForm = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const {data: dataById} = useQuery(['GET_BY_ID', id], () =>
        axios.get(`http://localhost:8080/upload/${id}`), {
        enabled: !!id,
        select: (response) => response.data
    });

    const {
        register,
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: dataById || {}
    });

    const { mutate, isLoading, isError, error, isSuccess } = useMutation((requestData) =>
            axios.post('http://localhost:8080/upload/save', requestData), {
            onSuccess: () => {
                navigate("/AdminPanel");
            }
        }
    );

    const onSubmit = (data) => {
        mutate(data);
    };

    useEffect(() => {
        if (dataById) {
            reset(dataById);
        }
    }, [dataById, reset]);


    return (
        <>
            <Header/>
            <div className="content-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3>Upload Tour Details</h3>
                    <input type="url" placeholder="Image" {...register("image")}/>
                    <input type="text" placeholder="Title" {...register("title")}/>
                    <input type="text" placeholder="Duration"  {...register("duration")}/>
                    <input type="text" placeholder="Min. Pax" {...register("minPax")} />
                    <select {...register("difficulty")}>
                        <option value="">Select Difficulty</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                    <input type="text" placeholder="Destination"  {...register("destination")}/>
                    <textarea placeholder="Description" maxLength={10000}  {...register("description")}/>
                    <select {...register("province")}>
                        <option value="">Select Province</option>
                        <option value="Koshi Province">Koshi Province</option>
                        <option value="Madhesh Province">Madhesh Province</option>
                        <option value="Bagmati Province">Bagmati Province</option>
                        <option value="Gandaki Province">Gandaki Province</option>
                        <option value="Lumbini Province">Lumbini Province</option>
                        <option value="Karnali Province">Karnali Province</option>
                        <option value="Sudurpashchim Province">Sudurpashchim Province</option>
                    </select>
                    <input type="text" placeholder="District" {...register("district")} />
                    <select {...register("region")}>
                        <option value="">Select Region</option>
                        <option value="Eastern Region">Eastern Region</option>
                        <option value="Central Region">Central Region</option>
                        <option value="Western Region">Western Region</option>
                        <option value="Mid-Western Region">Mid-Western Region</option>
                        <option value="Far-Western Region">Far-Western Region</option>
                    </select>
                    <input type="text" placeholder="Price" {...register("price")} />
                    <select {...register("category")}>
                        <option value="">Select Category</option>
                        <option value="Experience Culture">Experience Culture</option>
                        <option value="Experience Adrenaline">Experience Adrenaline</option>
                        <option value="Experience Nature">Experience Nature</option>
                        <option value="Experience Trails">Experience Trails</option>
                    </select>
                    <button type="submit" disabled={isLoading}>Submit</button>
                </form>
                {isLoading && <p>Saving...</p>}
                {isError && <p className="error">Error: {error.response.data.message}</p>}
                {isSuccess && <p className="success">Tour details saved successfully!</p>}
            </div>
        </>
    );
};

export default TourForm;
