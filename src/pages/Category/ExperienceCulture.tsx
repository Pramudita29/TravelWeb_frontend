import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import TourCard from "../components/TourCard.tsx";
import Header from "../components/Header.tsx";
import '../Category/css/Category.css';


interface Tour {
    id: number;
    image: string;
    tourLink: string;
    title: string;
    description: string;
    price: string;
    duration: string;
}

const ExperienceCulture: React.FC = () => {

    const {data:culture}=useQuery({
        queryKey:["CULTURE"],
        queryFn:()=>{
            return axios.get("http://localhost:8080/upload/byCategory/Experience Culture")
        }
    })

    // Mapping data from the table structure to Recipe structure
    const tour: Tour[] = culture?.data?.map((item: any) => ({
        id: item.id,
        image: item.image,
        tourLink: item.tourLink,
        title: item.title,
        description: item.description,
        price: item.price,
        duration: item.duration,

    })) || [];




    return (
        <>
            <Header/>


                <div className="header-img" style={{ backgroundImage: 'url(/Lumbini.jpeg)' }}>
                </div>

                <div className="header-info">
                    <h2 className="header-title">Experience Culture</h2>
                    <a href="/"></a>
                </div>


                <div className={'main-cards'}>
                    <section className="three-cards">
                        {tour.map((tour) => (
                            <TourCard key={tour.id} tour={tour} />
                        ))}
                    </section>
                </div>


        </>
    );
}

export default ExperienceCulture;