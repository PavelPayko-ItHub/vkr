import { useEffect, useState, type FC } from 'react'

import { type IMainProps } from './main-types'
import { instanceAxios } from '../../core/api/axios'
import { Flex, Layout, Menu, Spin, theme } from 'antd'
import { useNavigate } from 'react-router'
import { AddUser } from 'components/add-user'
import { useQuery } from '@tanstack/react-query'
import type { IUser } from 'core/types/user'
import { fetchUsers } from 'core/api/users-api'

import { Content } from 'components/content'

export const MainComponent: FC<IMainProps> = () => {
    const navigate = useNavigate()

    const [userData, setUserData] = useState<IUser | null>(null)
    const [activeUser, setActiveUser] = useState<string | null>(null)

    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken()

    const { data: users } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        select: (data: IUser[]) => data?.map(({ full_name, id }) => ({
            key: id,
            // icon: React.createElement(icon),
            label: full_name

        })).filter(user => user.label !== 'admin') || [],
    })


    useEffect(() => {
        instanceAxios.get('/api/auth_me')
            .then((data) => {
                localStorage.setItem('user', JSON.stringify(data.data))
                setUserData(data.data)

                if (data?.data?.role !== 'admin') {
                    setActiveUser(data.data.id)
                }
            })
            .catch((err) => {
                if (err.status === 401) {
                    navigate('/auth')
                } else {
                    console.error({ err });
                }

            })

    }, [])

    if (!userData?.role) {
        return <Flex align='center' justify='center'>
            <Spin spinning />
        </Flex>
    }

    const isAdmin = userData?.role === 'admin'

    if (!isAdmin) {
        return <Content userId={activeUser} />
    }

    return <Layout style={{ height: '100%' }}>
        <Flex style={{ width: '100%' }} gap={16}>
            <Layout.Sider
                width={200}
                style={{ background: colorBgContainer, borderRadius: borderRadiusLG, padding: 8 }}
            >
                <Flex
                    vertical
                    justify='space-between'
                    style={{ height: '100%' }}
                >

                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['all']}
                        selectedKeys={[activeUser || 'all']}
                        style={{ height: '100%', borderInlineEnd: 0 }}
                        items={[{ key: 'all', label: 'Все пользователи' }, ...(users || [])]}
                        onSelect={(info) => {
                            const key = info.key === 'all' ? null : info.key
                            setActiveUser(key)
                        }}
                    />
                    <AddUser />
                </Flex>
            </Layout.Sider>

            <Content userId={activeUser} />
        </Flex>
    </Layout >
}