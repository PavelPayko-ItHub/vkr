import { useEffect, useState, type FC } from 'react'

import { type IMainProps } from './main-types'
import { instanceAxios } from '../../core/api/axios'
import { Button, Card, DatePicker, Flex, Form, Layout, Menu, message, Modal, Select, Spin, theme, Typography, type MenuProps, type SelectProps } from 'antd'
import { AdminPanel } from '../admin-panel'
import { UserRequests } from '../user-requests'
import { useNavigate } from 'react-router'
import { Points } from 'components/points'
import { AddUser } from 'components/add-user'
import { useQuery } from '@tanstack/react-query'
import type { IUser } from 'core/types/user'
import { fetchUsers } from 'core/api/users-api'

export const MainComponent: FC<IMainProps> = () => {
    const navigate = useNavigate()

    const [userData, setUserData] = useState({})
    const [activeUser, setActiveUser] = useState('')


    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken()

    const { isPending, error, data: users, isFetching, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        select: (data) => data?.map(({ full_name, id }) => ({
            key: id,
            // icon: React.createElement(icon),
            label: full_name

        })) || [],
    })
    const siderStyle: React.CSSProperties = {
        overflow: 'auto',
        height: '100vh',
        position: 'sticky',
        insetInlineStart: 0,
        top: 0,
        scrollbarWidth: 'thin',
        scrollbarGutter: 'stable'
    }

    console.log({ users })

    // const items: MenuProps['items'] = data?.map(({ fullname, id }) => ({
    //     key: id,
    //     // icon: React.createElement(icon),
    //     label: fullname

    // })) || []

    useEffect(() => {
        instanceAxios.get('/api/auth_me')
            .then((data) => {
                console.log({ auth: data });
                localStorage.setItem('user', JSON.stringify(data.data))
                setUserData(data.data)
            })
            .catch((err) => {
                if (err.status === 401) {
                    navigate('/auth')
                } else {
                    console.log({ err });
                }

            })

    }, [])

    console.log({ userData });



    if (!userData?.role) {
        return <Flex align='center' justify='center'>
            <Spin spinning />
        </Flex>
    }

    return <Layout>
        <Layout.Sider
            width={200}
            style={{ background: colorBgContainer, padding: 8 }}
        >
            <Flex
                vertical
                justify='space-between'
                style={{ height: '100%' }}
            >

                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderInlineEnd: 0 }}
                    items={users}
                    onSelect={(info) => {
                        setActiveUser(info.key)
                        console.log({ info })
                    }}
                />
                <AddUser />
            </Flex>
        </Layout.Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
            <Layout.Content
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG
                }}
            >
                <Points userId={activeUser} />
            </Layout.Content>
        </Layout>
    </Layout>
}