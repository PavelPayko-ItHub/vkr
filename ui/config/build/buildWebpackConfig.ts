import type webpack from 'webpack'

import { buildDevServer } from './buildDevServer'
import { buildLoaders } from './buildLoaders'
import { buildPlugins } from './buildPlugins'
import { buildResolvers } from './buildResolvers'
import { type BuildOptions } from './types/config'

export const buildWebpackConfig = (options: BuildOptions): webpack.Configuration => {
    const {
        paths,
        mode,
        isDev
    } = options
    return {
        mode,
        entry: paths.entry,
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true,
            publicPath: '/'
        },
        plugins: buildPlugins(options),
        module: { rules: buildLoaders(options) },
        resolve: buildResolvers(options),
        devtool: undefined, // isDev ? 'eval-cheap-module-source-map' : undefined, 'inline-source-map'
        devServer: isDev ? buildDevServer(options) : undefined
    }
}
