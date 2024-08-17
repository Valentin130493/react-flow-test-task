import {RouteObject} from "react-router-dom";
import {ROUTES} from "../routes";
import HomePage from "./home";
import ErrorPage from "./errorPage";
import HeroInfo from "./heroInfo";


export const ROUTES_OBJECT: RouteObject[] = [
    {
        index: true,
        path: ROUTES.home,
        Component: HomePage,
    },
    {
        path: `${ROUTES.hero}/:id`,
        Component: HeroInfo
    },
    {
        Component: ErrorPage,
        path: ROUTES.notFount,
    },
];