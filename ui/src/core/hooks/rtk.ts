import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { type IRootState, type TAppDispatch } from '../store/store-types'

export const useAppDispatch = (): TAppDispatch => useDispatch<TAppDispatch>()
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector
