import type { PathRouteProps } from 'react-router-dom'

import { type TRoleType } from 'core/user/user-types'

import { type AppRoutes } from './routes'

export interface RouteConfig extends PathRouteProps {
    name: AppRoutes
    authOnly?: boolean
    roles?: TRoleType
}
