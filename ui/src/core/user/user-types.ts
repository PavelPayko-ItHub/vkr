export interface IUserState {
    userInfo: IMeInfo | null
}

export type TRoleType = 'hr' | 'candidate'

export interface IMeInfo {
    id: number
    fml: string
    email: string
    avatar: string | boolean
    role: string
}
