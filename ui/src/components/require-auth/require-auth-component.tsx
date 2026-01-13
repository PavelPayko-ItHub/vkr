import { type FC, type ReactElement, useMemo } from 'react'

import { Navigate, useLocation } from 'react-router-dom'

import { useAppSelector } from 'core/hooks/rtk'
import { getUserInfo, getUserRoles } from 'core/user/user-selectors'
import { type TRoleType } from 'core/user/user-types'

import { RoutePath } from '../app-router/routes'

export const RequireAuthComponent: FC<{ children: ReactElement, roles?: TRoleType }> = ({
    children,
    roles
}) => {
    const location = useLocation()
    const userInfo = useAppSelector(getUserInfo)
    const userRoles = useAppSelector(getUserRoles)

    const hasRequiredRoles = useMemo(() => {
        if (!roles) {
            return true
        }

        // return roles.some((requiredRole) => userRoles?.includes(requiredRole)) // Если массив

        return userRoles === roles // Если массив
    }, [roles, userRoles])

    if (!userInfo) {
        return <Navigate to={RoutePath.auth}
            state={{ from: location }}
            replace />
    }

    if (!hasRequiredRoles) {
        return (
            <Navigate
                to={RoutePath.forbidden}
                state={{ from: location }}
                replace
            />
        )
    }

    return children
}
