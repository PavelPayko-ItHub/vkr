export enum AppRoutes {
    AUTH = 'auth',
    MAIN = 'main',

    NOT_FOUND = 'not-found',
    FORBIDDEN = 'forbidden'
}

export const getRouteMain = () => '/'
export const getRouteSettings = () => '/auth'
export const getRouteForbidden = () => '/forbidden'

// export const getRouteProfile = (id: string) => `/profile/:${id}`
// export const getRouteArticleEdit = (id: string) => `/articles/:${id}/edit`

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.AUTH]: getRouteSettings(),

    [AppRoutes.MAIN]: getRouteMain(),

    [AppRoutes.FORBIDDEN]: getRouteForbidden(),
    [AppRoutes.NOT_FOUND]: '*'
}
