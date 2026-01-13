export interface IUser {
    userId: number
    name: string
}

export interface ICreateUserData extends Omit<IUser, 'userId'> {
}
