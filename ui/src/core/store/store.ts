import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { type IRootState } from './store-types'
import { userReducer } from '../user/user-slice'
import { rtkQueryApi } from '../rtk-query/rtk-query-api'

export const createReduxStore = (initialState?: IRootState) => {
    const rootReducer = combineReducers({
        user: userReducer,
        [rtkQueryApi.reducerPath]: rtkQueryApi.reducer
    })

    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rtkQueryApi.middleware),
        devTools: true,
        preloadedState: initialState
    })
}
