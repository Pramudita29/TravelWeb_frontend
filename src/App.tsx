import {createBrowserRouter, RouterProvider} from "react-router-dom";
import SignIn from "./pages/SignIn.tsx";
import {QueryClient, QueryClientProvider} from "react-query";
import ChangePassword from "./pages/ChangePassword.tsx";
import Homepage from "./pages/Homepage.tsx";
import ExperienceCulture from "./pages/Category/ExperienceCulture.tsx";
import TourForm from "./pages/Admin/TourForm.tsx";
import AdminPanel from "./pages/Admin/AdminPanel.tsx";
import ExperienceAdrenaline from "./pages/Category/ExperienceAdrenaline.tsx";
import TourDetails from "./pages/components/TourDetails.tsx";
import TourBookingForm from "./pages/components/TourBookingForm.tsx";
import TourView from "./pages/TourView.tsx";
import UserProfile from "./pages/UserProfile.tsx";
import ExperienceTrails from "./pages/Category/ExperienceTrails.tsx";
import ExperienceNature from "./pages/Category/ExperienceNature.tsx";
import EditProfile from "./pages/components/EditProfile.tsx";

const router  =createBrowserRouter(
    [
        {
            path:"/",
            element:<Homepage/>
        },
        {
            path:"/SignIn",
            element:<SignIn/>
        },
        {
            path:"/ChangePassword",
            element:<ChangePassword/>
        },
        {
            path:"Category/ExperienceCulture",
            element:<ExperienceCulture/>
        },
        {
            path:"Category/ExperienceAdrenaline",
            element:<ExperienceAdrenaline/>
        },
        {
            path:"Category/ExperienceTrails",
            element:<ExperienceTrails/>
        },
        {
            path:"Category/ExperienceNature",
            element:<ExperienceNature/>
        },
        {
            path:"/Form",
            element:<TourForm/>
        },
        {
            path: "/admin/TourForm",
            element: <TourForm/>
        },

        {
            path: "/admin/uploadedit/:id",
            element: <TourForm/>
        },
        {
            path :"/AdminPanel",
            element: <AdminPanel/>
        },
        {
            path :"/TourDetails",
            element: <TourDetails/>
        },
        {
            path: "/tourview/:id",
            element: <TourView/>
        },
        {
            path: "/booking",
            element: <TourBookingForm/>
        },
        {
            path: "/profile",
            element: <UserProfile/>
        },
        {
            path: "/EditProfile",
            element: <EditProfile/>
        },
      ]
)

const querClient= new QueryClient();

function App() {

    return (
        <>
            <QueryClientProvider client={querClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </>
    )
}

export default App

