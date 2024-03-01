import Header from "./components/Header.tsx";
import Hero from "./components/Hero.tsx";
import '../App.css';
import GalleryItem from "./components/GalleryItem.tsx";
import ValueTrips from "./components/ValueTrips.tsx";
import Footer from "./components/Footer.tsx";

function Homepage ()  {

    return(
        <>


            <Header/>
            <div>
                <Hero/>
                <GalleryItem/>
                <ValueTrips/>
            </div>
            <Footer/>

        </>
    )
}
export default Homepage;

