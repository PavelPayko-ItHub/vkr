type IPointStatus = 'new' | 'in_progress' | 'completed'
type IPointType = 'point' | 'achievement'

export interface IPoint {
  id: string
  user_id: string
  description: string
  deadline: string
  status: IPointStatus 
  type: IPointType
  created_at: string
}

export interface IUserPoint extends IPoint {
  full_name :string
  login: string
}

export type IPointUpdate = Omit<IPoint, 'id' | 'created_at'>
export type IPointCreate = Omit<IPointUpdate, 'status'>