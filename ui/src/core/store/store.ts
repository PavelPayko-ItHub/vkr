import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { rtkQueryApi } from '../rtk-query/rtk-query-api'

export const createReduxStore = () => {
    const rootReducer = combineReducers({
        [rtkQueryApi.reducerPath]: rtkQueryApi.reducer
    })

    return configureStore({
        reducer: rootReducer,
        devTools: true,
    })
}
