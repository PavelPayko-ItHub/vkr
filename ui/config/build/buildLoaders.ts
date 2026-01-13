import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import type webpack from 'webpack'

import { babelLoader } from './loaders/babelLoader'
import { type BuildOptions } from './types/config'

export const buildLoaders = ({ isDev }: BuildOptions): webpack.RuleSetRule[] => {
    const cssLoaders = {
        test: /\.(scss|css)$/i,
        exclude: /node_modules/,
        use: [
            isDev
                ? 'style-loader'
                : MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        auto: /\.module\./,
                        localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
                        exportLocalsConvention: 'camelCase'
                    }
                }
            },
            'sass-loader'
        ]
    }

    const svgLoader = {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: ['@svgr/webpack']
    }

    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff|woff2|ico)$/i,
        exclude: /node_modules/,
        type: 'asset/resource',
        generator: { filename: isDev ? 'static/[name][ext]' : 'static/[contenthash][ext]' }
    }

    const codeBabelLoader = babelLoader({
        isDev,
        isTsx: false
    })
    const tsxCodeBabelLoader = babelLoader({
        isDev,
        isTsx: true
    })

    return [svgLoader, fileLoader, codeBabelLoader, tsxCodeBabelLoader, cssLoaders]
}
