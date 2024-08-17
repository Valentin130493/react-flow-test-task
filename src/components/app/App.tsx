import {RouterProvider} from "react-router";
import {createBrowserRouter} from "react-router-dom";
import {ROUTES_OBJECT} from "../../pages";


const router = createBrowserRouter(ROUTES_OBJECT);
export const App = () => {
    return <RouterProvider router={router}/>
}

