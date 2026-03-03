import { Auth } from '../auth'
import { Registration } from '../registration'
import { Main } from '../main'
import { NotFound } from '../not-found'
import { RequestCreate } from '../request-create'

export const routes = [
    {
        name: 'auth',
        path: '/auth',
        element: <Auth/>
    },
        {
        name: 'registration',
        path: '/registration',
        element: <Registration/>
    },
     {
        name: 'request',
        path: '/request',
        element: <RequestCreate/>
    },
    {
        name: 'main',
        path: '/',
        element: <Main/>
    },
    {
        name: 'not-found',
        path: '*',
        element: <NotFound/>
    },
    {
        name: 'forbidden',
        path: '/forbidden',
        element: <div>Доступ запрещён</div>
    }
]
