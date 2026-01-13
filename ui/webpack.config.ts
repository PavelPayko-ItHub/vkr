import path from 'path'
import type webpack from 'webpack'

import { buildWebpackConfig } from './config/build/buildWebpackConfig'
import { type BuildEnv, type BuildOptions, type BuildPaths } from './config/build/types/config'

export default (env: BuildEnv): webpack.Configuration => {
    const paths: BuildPaths = {
        build: path.resolve(__dirname, 'build'),
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        favicon: path.resolve(__dirname, 'public', 'favicon.svg'),
        src: path.resolve(__dirname, 'src')
    }

    const mode = env.mode || 'development'
    const port = env.port || 3000
    const isDev = mode === 'development'
    const apiUrl = isDev
        ? 'https://development.ru'
        : 'https://production.ru'

    const webpackConfig: BuildOptions = {
        mode,
        paths,
        isDev,
        port,
        apiUrl
    }

    return buildWebpackConfig(webpackConfig)
}
