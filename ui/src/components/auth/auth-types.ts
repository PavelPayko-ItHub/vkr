import type { AxiosError } from 'axios'
import type { IUser } from 'core/types/user'

export type TValue = string | number

export interface ITab {
    label: string
    value: TValue
}

export interface ILoginData extends IUser {
    token: string
}

export interface IRegistrationData extends IUser {
    email: string
    accessToken?: string
}

export type IRequestError = AxiosError<{error: string}>