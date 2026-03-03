export const emailRegex = /^\S+@\S+\.\S+$/ 
export const loginRegexWidthLength = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
export const phoneRegex = /^8$\d{3}$\d{3}-\d{2}-\d{2}$/;



export const validateEmail = async (_: unknown, value: string): Promise<void> => {
    await new Promise((resolve, reject) => {
        if (value && !/^\S+@\S+\.\S+$/.test(value)) {
            reject(new Error('Пожалуйста, введите корректный email'))
        } else {
            resolve(undefined)
        }
    })
}

export const validateLogin = async (_: unknown, value: string): Promise<void> => {
    const loginRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/;
    await new Promise((resolve, reject) => {
        if (value && !loginRegex.test(value)) {
            reject(new Error('Логин должен содержать латинские буквы и цифры длиной минимум шесть символов'))
        } else {
            resolve(undefined)
        }
    })
}

export const validatePhone = async (_: unknown, value: string): Promise<void> => {
    await new Promise((resolve, reject) => {
        if (value && !phoneRegex.test(value)) {
            reject(new Error('Введите телефон в формате 8(XXX)XXX-XX-XX'))
        } else {
            resolve(undefined)
        }
    })
}
