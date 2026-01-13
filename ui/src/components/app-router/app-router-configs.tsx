
import { AuthPage } from 'pages/auth-page'
import { MainPage } from 'pages/main-page'
import { NotFoundPage } from 'pages/not-found-page'

import { type RouteConfig } from './app-router-types'
import { AppRoutes, RoutePath } from './routes'

export const routes: RouteConfig[] = [
    {
        name: AppRoutes.AUTH,
        path: RoutePath.auth,
        element: <AuthPage/>
    },
    {
        name: AppRoutes.MAIN,
        path: RoutePath.main,
        element: <MainPage/>
    },
    {
        name: AppRoutes.NOT_FOUND,
        path: RoutePath['not-found'],
        element: <NotFoundPage/>
    },
    {
        name: AppRoutes.NOT_FOUND,
        path: RoutePath.forbidden,
        element: <div>Доступ запрещён</div>
    }
]
