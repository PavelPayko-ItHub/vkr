export const validateEmail = async (_: any, value: string): Promise<void> => {
    await new Promise((resolve, reject) => {
        if (value && !/^\S+@\S+\.\S+$/.test(value)) {
            reject(new Error('Пожалуйста, введите корректный email'))
        } else {
            resolve(undefined)
        }
    })
}
