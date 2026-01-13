import { instanceAxios } from 'core/api/axios'

import { type IMeInfo } from './user-types'

export const userApi = {
    authMe: async () =>
        await instanceAxios.get<IMeInfo>('/auth/me'),

    logout: async () =>
        await instanceAxios.delete('/auth/logout')
}
