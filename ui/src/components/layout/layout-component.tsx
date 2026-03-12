import { type FC } from 'react'

import {
    Layout,
} from 'antd'

import { type IMainProps } from './layout-types'
import { Outlet } from 'react-router'

import styles from './layout.module.css'
import { Header } from './components/header'

export const LayoutComponent: FC<IMainProps> = () => {
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
