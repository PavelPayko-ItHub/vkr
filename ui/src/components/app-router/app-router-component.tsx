import {
    type FC,
    type ReactNode,
    Suspense,
    useCallback
} from 'react'

import { Route, Routes } from 'react-router'
import { routes } from './app-router-configs'
import { Layout } from '../layout'
import type { IRoute } from './app-router-types'

export const AppRouterComponent: FC = () => {
    const renderRoutes: (route: IRoute) => ReactNode = useCallback(({
        path,
        element
    }) => {
        return (
            <Route
                key={path}
                path={path}
                element={<Suspense fallback={<div>Loading...</div>}>{element}</Suspense>}
            />
        )
    }, [])

    return <Routes>
        <Route path={'/'} element={<Layout/>}>
      {routes.map(renderRoutes)}
      </Route>
      </Routes>
}
