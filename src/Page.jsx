import App from "@/App.jsx";
import {createHashRouter, RouterProvider,redirect} from "react-router-dom";
import Login from "@/view/login/login.jsx";
import ErrorPage from "@/view/errorPage/errorPage.jsx";
import React from "react";
import {RoutesList} from '@/routes/index.jsx'

const loader = async () => {
    // const user = await getUser();
    const user = localStorage.getItem('userInfo')
    if (!user) {
        return redirect("/login");
    }
    return null;
};
const router = createHashRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/*",
        element: <App />,
        children: RoutesList,
        loader,
    },
    {
        path: "*",
        element: <ErrorPage />,
    },
]);
export default ()=>(
    // <BrowserRouter  >
    //     <Routes>
    //         <Route path="/" element={<App />} />
    //         <Route path="/404" element={<ErrorPage />} />
    //         <Route path="/login" element={<Login />} />
    //     </Routes>
    // </BrowserRouter>
    <RouterProvider router={router} ></RouterProvider>
)
