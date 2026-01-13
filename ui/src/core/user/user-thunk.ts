import { message } from 'antd'

import { userApi } from './user-api'
import { setUserInfo } from './user-slice'
import { type TAppThunk } from '../store/store-types'

export const authMe = (): TAppThunk => async (dispatch) => {
    try {
        const res = await userApi.authMe()

        if (res.status === 200) {
            dispatch(setUserInfo(res.data))
        }
    } catch (e) {
        await message.error(e.message)
    }
}

export const logout = (): TAppThunk => async (dispatch) => {
    try {
        const res = await userApi.logout()
        if (res.status === 204) {
            dispatch(setUserInfo(null))
            localStorage.removeItem('token')
        }
    } catch (e) {
        await message.error(e.message)
    }
}
