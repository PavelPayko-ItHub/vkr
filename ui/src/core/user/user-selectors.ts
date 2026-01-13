import { createSelector } from '@reduxjs/toolkit'

import { type IUserState } from './user-types'
import { type IRootState } from '../store/store-types'

export const getUserSelector = (state: IRootState): IUserState | undefined => state?.user

export const getUserInfo = createSelector(
    getUserSelector,
    (user) => user?.userInfo
)

export const getUserRoles = createSelector(
    getUserSelector,
    (user) => user?.userInfo?.role
)
