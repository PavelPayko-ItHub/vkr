import { type IMeInfo } from 'core/user/user-types'

export type TValue = string | number

export interface ITab {
    label: string
    value: TValue
}

export interface ILoginData extends IMeInfo {
    token: string
}

export interface IRegistrationData extends IMeInfo {
    email: string
    accessToken?: string
}
