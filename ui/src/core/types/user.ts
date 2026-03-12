export interface IUser {
  id: string
  login: string
  password: string
  full_name: string
  phone: string
  email: string
  role: IUserRole
  created_at: string
}

type IUserRole = 'user' | 'admin' 

export type IUserUpdate = Omit<IUser, 'role' | 'created_at'>
export type IUserCreate = Omit<IUserUpdate, 'id'>
