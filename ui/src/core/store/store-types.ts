import {
    type Action,
    type ThunkAction,
    type ThunkDispatch,
    type UnknownAction
} from '@reduxjs/toolkit'


export interface IRootState {
    user?: {name: string}
}
export type TAppDispatch = ThunkDispatch<IRootState, undefined, UnknownAction>
export type TAppThunk<ReturnType = void> = ThunkAction<ReturnType, IRootState, unknown, Action<string>>
