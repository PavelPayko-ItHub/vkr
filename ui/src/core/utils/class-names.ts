type TMods = Record<string, boolean | string | undefined | null>
type TAdditional = Array<string | undefined>

export const cn = (...args: Array<string | TAdditional | TMods>): string => {
    const classes: string[] = []
    let additional: TAdditional = []
    let mods: TMods = {}

    args.forEach((arg) => {
        if (typeof arg === 'string') {
            classes.push(arg)
        } else if (Array.isArray(arg)) {
            additional = arg
        } else if (typeof arg === 'object') {
            mods = arg
        }
    })

    return [
        ...classes,
        ...additional.filter(Boolean),
        ...Object.keys(mods).filter(key => mods[key])
    ].join(' ')
}
