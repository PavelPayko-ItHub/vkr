import {
    type Action,
    type ThunkAction,
    type ThunkDispatch,
    type UnknownAction
} from '@reduxjs/toolkit'

import { type IUserState } from '../user/user-types'

export interface IRootState {
    user?: IUserState
}
export type TAppDispatch = ThunkDispatch<IRootState, undefined, UnknownAction>
export type TAppThunk<ReturnType = void> = ThunkAction<ReturnType, IRootState, unknown, Action<string>>
