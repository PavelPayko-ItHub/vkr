import { type FetchBaseQueryMeta } from '@reduxjs/toolkit/query'

export type TPaginationStringedPerPage = '10' | '20' | '50'
export type TPaginationNumberedPerPage = 10 | 20 | 50

export interface IMeta {
    current_page: number
    from: number
    last_page: number
    per_page: TPaginationStringedPerPage
    to: number
    total: number
}

export interface ISyntheticEvent {
    target: { value: number[] }
}

export interface IResultWithoutData {
    pager?: IMeta
    meta?: IMeta
    result: boolean
    message: string
    errors?: Record<string, string[]>
}

export interface IResult<T = any> extends IResultWithoutData {
    data: T
}

export interface IGetById {
    id: number
}

export interface IDeleteById {
    id: number
}

export type TCreateEditForm<T> = T & {
    formType: 'create' | 'edit'
}

export type CustomFetchQueryError<Data = unknown> =
  | {
      status: number
      data: IResult<Data>
  }
  | {
      status: 'FETCH_ERROR'
      data?: IResult<Data>
      error: string
  }
  | {
      status: 'PARSING_ERROR'
      originalStatus: number
      data: IResult<Data>
      error: string
  }
  | {
      status: 'TIMEOUT_ERROR'
      data?: IResult<Data>
      error: string
  }
  | {
      status: 'CUSTOM_ERROR'
      data?: IResult<Data>
      error: string
  }

// TODO: унести типы к ртк
export interface IRTKError<Data> {
    data?: IResult<Data>
    error: CustomFetchQueryError<Data>
    meta: FetchBaseQueryMeta
}

export interface IPaginationParams {
    page: number
    perPage: number
}

export interface ITimestamp {
    fromTime: string
    toTime: string
}
