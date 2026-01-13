export type BuildMode = 'production' | 'development'

export interface BuildPaths {
    entry: string
    build: string
    html: string
    favicon?: string
    src: string
}

export interface BuildOptions {
    mode: BuildMode
    paths: BuildPaths
    isDev: boolean
    apiUrl: string
    port: number
}

export interface BuildEnv {
    mode: BuildMode
    port: number
}
