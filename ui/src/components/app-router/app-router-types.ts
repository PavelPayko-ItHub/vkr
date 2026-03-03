import type { JSX } from "react";

export type IRoute = {
    name: string;
    path: string;
    element: JSX.Element;
}