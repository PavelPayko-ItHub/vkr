import { type FC } from 'react'

import { Layout } from 'antd'

import { AppRouter } from '../components/app-router'

import './index.css'

export const App: FC = () => {
    // const dispatch = useAppDispatch()

    // useEffect(() => {
    //     dispatch(authMe())
    // }, [])

    return (
        <div className={'app'}>
            <Layout style={{
                minHeight: '100vh',
                background: '#fff'
            }}>
                <AppRouter/>
            </Layout>
        </div>
    )
}
