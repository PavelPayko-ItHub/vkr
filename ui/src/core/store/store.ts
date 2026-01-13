import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { rtkQueryApi } from 'core/rtk-query/rtk-query-api'

import { type IRootState } from './store-types'
import { userReducer } from '../user/user-slice'

export const createReduxStore = (initialState?: IRootState) => {
    const rootReducer = combineReducers({
        user: userReducer,
        [rtkQueryApi.reducerPath]: rtkQueryApi.reducer
    })

    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rtkQueryApi.middleware),
        devTools: __IS_DEV__,
        preloadedState: initialState
    })
}
