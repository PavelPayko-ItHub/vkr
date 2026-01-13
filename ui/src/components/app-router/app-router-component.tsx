import {
    type FC,
    type ReactNode,
    Suspense,
    useCallback
} from 'react'

import { Route, Routes } from 'react-router-dom'

import { RequireAuth } from 'components/require-auth'

import { routes } from './app-router-configs'
import { type RouteConfig } from './app-router-types'

export const AppRouterComponent: FC = () => {
    const renderRoutes: (route: RouteConfig) => ReactNode = useCallback(({
        path,
        element,
        authOnly,
        roles
    }) => {
        const wrapElement = <Suspense fallback={<div>Loading...</div>}>
            {element}
        </Suspense>

        return (
            <Route
                key={path}
                path={path}
                element={authOnly ? <RequireAuth roles={roles}>{wrapElement}</RequireAuth> : wrapElement}
            />
        )
    }, [])

    return <Routes>{routes.map(renderRoutes)}</Routes>
}
