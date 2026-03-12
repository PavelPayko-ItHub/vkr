import type { JSX } from "react";

export type IRoute = {
    name: string;
    path: string;
    protect?: boolean
    element: JSX.Element;
}

export interface IProtectedRouteProps {
    children: JSX.Element
}