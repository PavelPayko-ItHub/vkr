import type { Configuration as DevServerConfigurations } from 'webpack-dev-server'

import { type BuildOptions } from './types/config'

export const buildDevServer = (options: BuildOptions): DevServerConfigurations => ({
    port: options.port,
    open: true,
    historyApiFallback: true,
    hot: true
})
