import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import type { IResultWithoutData } from 'core/types/main'

export interface IExtraOptions {
    ignoreStatusCode?: number[] | 'all'
}

export interface IRejectedAction {
    error?: {
        message?: unknown | 'Rejected'
    }
    meta: {
        RTK_autoBatch?: boolean
        aborted?: boolean
        arg: {
            endpointName?: string
            forceRefetch?: boolean
            originalArgs?: unknown
            queryCacheKey?: string
            subscribe?: boolean
            subscriptionOptions: {
                refetchOnReconnect?: boolean
                refetchOnFocus?: boolean
                pollingInterval?: number
                skipPollingIfUnfocused?: boolean
            }
            type: 'query' | 'mutation'
        }
        baseQueryMeta: {
            request?: Request
            response?: Response
            responseError?: IQueryResponseError
            extraOptions?: IExtraOptions
            condition?: boolean
            rejectedWithValue?: boolean
            requestId?: string
            requestStatus?: 'rejected' | 'fulfilled' | 'pending'
        }
    }
    payload?: Response
    type?: string
}

export type IQueryResponseError = FetchBaseQueryError & { status?: number, data?: IResultWithoutData }

export interface ISortParam {
    field: string
    order: 'asc' | 'desc'
}
