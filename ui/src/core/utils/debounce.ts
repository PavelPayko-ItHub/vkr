export const debounce = <T extends (...args: unknown[]) => unknown>(fn: T, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    return function (...args: Parameters<T>) {
        if (timeoutId) clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}
