import { type FC } from 'react'

import {
    Button,
    Dropdown,
    Layout,
    theme,
    type MenuProps
} from 'antd'

import { type IMainProps } from './layout-types'
import { Outlet, useNavigate } from 'react-router'

import styles from './layout.module.css'
import { Header } from '../header'

export const LayoutComponent: FC<IMainProps> = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const navigate = useNavigate()

    const userData = JSON.parse(localStorage.getItem('user') || '{}')

    const items: MenuProps['items'] = [
        {
            key: 'logout',
            label: 'Выйти',
            onClick: () => {
                localStorage.setItem('token', '')
                localStorage.setItem('user', '{}')
                navigate('/auth')
            }

        }
    ]

    return <Layout className={styles.layout}>
        <Header />

        <Layout.Content className={styles.content}>
            <Outlet />
        </Layout.Content>

        {/* <Layout.Footer style={{ padding: '12px 24px', background: colorBgContainer }}>
            ItHub
        </Layout.Footer> */}
    </Layout>
}
