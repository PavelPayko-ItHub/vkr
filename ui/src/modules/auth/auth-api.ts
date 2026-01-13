import { instanceAxios } from 'core/api/axios'

import { type ILoginData } from './auth-types'

export const authApi = {
    /**
     * Логин
     * @param email - E-mail пользователя
     * @param password - Пароль пользователя
     */
    login: async (email: string, password: string) =>
        await instanceAxios.post<ILoginData>('/auth/login', { email, password }),

    /**
     * Регистрация нового пользователя в системе
     * @param data - Объект со следующими данными:
     * * fml - ФИО
     * * email - E-mail пользователя
     * * password - Пароль пользователя
     * * role - Роль пользователя
     */
    registration: async (data: any) =>
        await instanceAxios.post('/auth/registration', data)
}
