export interface IUser {
  id: string
  login: string
  password: string
  fullname: string
  phone: string
  email: string
  role: IUserRole
  created_at: string
}

type IUserRole = 'user' | 'admin' 

export type IUserCreate = Omit<IUser, 'id' | 'role' | 'created_at'>
