
import { rtkQueryApi } from 'core/rtk-query/rtk-query-api'
import { type IResult } from 'core/types/main'

import { type ICreateUserData, type IUser } from './users-types'

export const usersApi = rtkQueryApi.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query<IUser[], Record<string, any>>({
            query: (params) => ({
                url: 'users',
                method: 'GET',
                params
            }),
            providesTags: (result) => {
                console.log({ result })

                return result
                    ? [
                        ...result?.map(({ userId }) => ({
                            type: 'users' as const,
                            id: userId
                        })),
                        {
                            type: 'users',
                            id: 'LIST'
                        }
                    ]
                    : [{
                        type: 'users',
                        id: 'LIST'
                    }]
            }
        }),
        deleteUser: build.mutation<IResult, IUser['userId']>({
            query: (id) => ({
                url: `users/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{
                type: 'users',
                id: 'LIST'
            }]
        }),
        createUser: build.mutation<IResult<IUser>, ICreateUserData>({
            query: (params) => ({
                url: 'users',
                method: 'POST',
                body: params
            }),
            invalidatesTags: [{
                type: 'users',
                id: 'LIST'
            }],
            extraOptions: { ignoreStatusCode: [422] }
        }),

        getUserById: build.query<IResult<IUser>, IUser['userId']>({
            query: (userId) => ({
                url: `users/${userId}`,
                method: 'GET'
            }),
            keepUnusedDataFor: 0,
            providesTags: ['user']
        }),

        editUser: build.mutation<IResult<IUser>, IUser>({
            query: ({ userId, ...params }) => ({
                url: `users/${userId}`,
                method: 'PUT',
                body: params
            }),
            invalidatesTags: ['users', 'user'],
            extraOptions: { ignoreStatusCode: [422] }
        })
    })
})
