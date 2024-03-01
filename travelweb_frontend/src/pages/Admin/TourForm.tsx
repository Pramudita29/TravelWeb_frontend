import {useMutation, useQuery} from "react-query";
import axios from "axios";
import {SubmitHandler, useForm} from "react-hook-form";
import '../components/css/TourForm.css';
import Header from "../components/Header.tsx";
import { useNavigate, useParams } from "react-router-dom";
import './css/TourForm.css';

const TourForm = () => {

    const {id} = useParams();

    const navigate = useNavigate();

    const {data: dataById} = useQuery({
        queryKey: ["GET_BY_ID"],
        queryFn: () => {
            return axios.get("http://localhost:8080/upload/" + id)
        }, enabled: !!id
    })


    const {
        register,
        handleSubmit,
        formState
    } = useForm({
        defaultValues: id ? dataById?.data : {},
        values: id ? dataById?.data : {},
    });


    const saveData = useMutation((requestData: any) => {
        return axios.post('http://localhost:8080/upload/save', requestData)
    });


    const onSubmit: SubmitHandler<any> = async (data) => {
        try {
            saveData.mutate(data, {
                onSuccess() {
                    navigate("/AdminPanel")
                }
            });
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };


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
                    {/* Province select input */}
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
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
};

    export default TourForm;


