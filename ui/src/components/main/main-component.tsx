import { type FC } from 'react'

import {
    CheckCircleOutlined, ClockCircleOutlined, PlusOutlined, RiseOutlined
} from '@ant-design/icons'
import {
    Button,
    Flex,
    Layout, Menu, type MenuProps, theme,
    Timeline
} from 'antd'

import { usersApi } from 'core/api/users-api/users-api'

import { type IMainProps } from './main-types'

const {
    Header, Content, Footer, Sider
} = Layout

export const MainComponent: FC<IMainProps> = () => {
    // Селекторы\Контекст

    // Стейты

    // Кастомные хуки и Библиотечные хуки (пр. api)

    // Константы и работа с ними | Consts

    // Эффекты | Effects | React.useEffect & React.useLayoutEffect

    // Обработчики | Handlers | const = () => {}

    // Условный рендер | Condition Render

    const { data, isLoading } = usersApi.useGetUsersQuery({})
    const siderStyle: React.CSSProperties = {
        overflow: 'auto',
        height: '100vh',
        position: 'sticky',
        insetInlineStart: 0,
        top: 0,
        scrollbarWidth: 'thin',
        scrollbarGutter: 'stable'
    }

    console.log({ data })

    const items: MenuProps['items'] = data?.map(({ name, userId }) => ({
        key: String(userId + 1),
        // icon: React.createElement(icon),
        label: `${name}`

    })) || []

    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken()

    return <Layout>
        <Header style={{ display: 'flex', alignItems: 'center' }} >
            <div className="demo-logo" />
            {/* <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                items={items1}
                style={{ flex: 1, minWidth: 0 }}
            /> */}
        </Header>
        <Layout>
            <Sider
                width={200}
                style={{ background: colorBgContainer }}
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
                        items={items}
                    />
                    <Button>Add</Button>
                </Flex>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>

                {/* <Breadcrumb
                    items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
                    style={{ margin: '16px 0' }}
                    /> */}
                <Content
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG
                    }}
                >
                    <Flex vertical
                        align='center'>
                        <Timeline
                        // orientation='horizontal'
                            items={[
                                {
                                    title: '2015-09-01',
                                    content: 'Create a services',
                                    icon: <ClockCircleOutlined />
                                },
                                {
                                    title: '2015-09-01',
                                    content: 'Solve initial network problems',
                                    icon: <CheckCircleOutlined />
                                },
                                {
                                    content: 'Technical testing',
                                    icon: <RiseOutlined color='green'
                                        size={48}
                                        style={{ fontSize: 24, color: 'green' }}/>
                                },
                                {
                                    title: '2015-09-01',
                                    content: 'Network problems being solved',
                                    icon: <RiseOutlined color='green'
                                        size={48}
                                        style={{ fontSize: 16, color: 'grey' }}/>
                                },
                                {
                                    title: '2015-09-01',
                                    content: 'Network problems being solved'
                                },
                                {
                                    content: 'Add point',
                                    icon: <Button icon={<PlusOutlined />}
                                        shape='circle'
                                        type='dashed'
                                        onClick={() => {
                                            alert('click')
                                        }}/>

                                }
                            ]}
                        // mode="alternate"
                        />
                        <Flex align='center'
                            gap={8}>
                            <Button icon={<PlusOutlined />}
                                shape='circle'
                                type='dashed'/>
                        </Flex>
                    </Flex>
                </Content>
            </Layout>
        </Layout>
    </Layout>
}

// 1 - выполненый поинт -<CheckCircleOutlined />
// 2- запланированный поинт
// 3 - в процессе - <ClockCircleOutlined />
// 4 - полученное достижение - <RiseOutlined />
// 5- планируемое достижение
