import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import webpack from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

import { type BuildOptions } from './types/config'

export const buildPlugins = ({
    paths, isDev, apiUrl
}: BuildOptions): webpack.WebpackPluginInstance[] => {
    const isProd = !isDev

    const plugins = [
        new HTMLWebpackPlugin({
            template: paths.html,
            favicon: paths.favicon
        }),
        new webpack.ProgressPlugin(),
        new webpack.DefinePlugin({
            __REACT_APP_API_ADDRESS__: JSON.stringify(apiUrl),
            __IS_DEV__: JSON.stringify(isDev)
        }),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true
                },
                mode: 'write-references'
            }
        })
    ]

    if (isDev) {
        plugins.push(new ReactRefreshPlugin())
    }

    if (isProd) {
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        }))
        plugins.push(new BundleAnalyzerPlugin({
            openAnalyzer: true,
            analyzerPort: 9999
        }))
    }

    return plugins
}
