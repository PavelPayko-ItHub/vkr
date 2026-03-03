import { type FC } from 'react'

import {
    Button,
    Dropdown,
    Flex,
    Image,
    Layout,
    theme,
    Typography,
    type MenuProps
} from 'antd'

import { type IMainProps } from './header-types'
import { NavLink, Outlet, useNavigate } from 'react-router'

import styles from './header.module.css'
import { RiseOutlined, UserOutlined } from '@ant-design/icons'

export const HeaderComponent: FC<IMainProps> = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
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

    return <Layout.Header style={{ padding: '0 24px', background: colorBgContainer, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <NavLink to={'/'}>
            <Flex gap={8}>
                <RiseOutlined color='green'
                    size={48}
                    style={{ fontSize: 24, color: 'green' }} />
                <Typography.Text>Grow App</Typography.Text>
            </Flex>
        </NavLink>
        {
            userData.full_name
                ? <Dropdown menu={{ items }}>
                    <Button type='text' icon={<UserOutlined />}>{userData.full_name || ''}</Button>
                </Dropdown>
                : null
        }
    </Layout.Header>
}
