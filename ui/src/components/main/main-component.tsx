import { useEffect, useState, type FC } from 'react'

import { type IMainProps } from './main-types'
import { instanceAxios } from '../../core/api/axios'
import { Button, Card, DatePicker, Flex, Form, Layout, Menu, message, Modal, Select, Spin, Statistic, Tabs, theme, Typography, type MenuProps, type SelectProps, type TabsProps } from 'antd'
import { AdminPanel } from '../admin-panel'
import { UserRequests } from '../user-requests'
import { useNavigate } from 'react-router'
import { Points } from 'components/points'
import { AddUser } from 'components/add-user'
import { useQuery } from '@tanstack/react-query'
import type { IUser } from 'core/types/user'
import { fetchUsers } from 'core/api/users-api'
import Chart from 'chart.js/auto';

import { BarChart, LineChart, PieChart } from 'echarts/charts'
import {
    DataZoomComponent,
    GridComponent,
    LegendComponent,
    MarkLineComponent, ToolboxComponent,
    TooltipComponent
} from 'echarts/components'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import type { EChartsOption } from 'echarts-for-react/src/types'
import type { IPoint } from 'core/types/points'
import { UserDashboard } from 'components/user-dashboard'
import { MainDashboard } from 'components/main-dashboard'

export const MainComponent: FC<IMainProps> = () => {
    const navigate = useNavigate()

    const [userData, setUserData] = useState({})
    const [activeUser, setActiveUser] = useState<string | null>(null)


    const { data: points } = useQuery({
        queryKey: ['userPoints'],
        queryFn: async () => {
            const response = await instanceAxios.get(`/api/points`)
            // const response = await instanceAxios.get(`/api/points`)
            return response
        },
        select: (data: IPoint[]) => data?.data?.reduce((acc, point) => {
            const key = point.full_name
            console.log('reduce', point, acc);

            if (acc[key]) {
                console.log('reduce if', point, acc);
                acc[key] = acc[key] + 1
                return acc
            }

            acc[key] = 1

            return acc
        }, {}) || {}
    })

    console.log({ points });


    echarts.use([
        BarChart,
        LineChart,
        PieChart,
        LegendComponent,
        TooltipComponent,
        // DatasetComponent,
        GridComponent,
        MarkLineComponent,
        // SVGRenderer,
        CanvasRenderer,
        // VisualMapComponent,
        DataZoomComponent,
        ToolboxComponent
    ])

    const option: EChartsOption = {
        xAxis: {
            type: 'category',
            // data: ['User', 'User2', 'User3', 'User4', 'User 5']
            data: Object.keys(points || {})
        },
        tooltip: {
            trigger: 'item'
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                // data: [2, 3, 1, 3, 2],
                data: Object.values(points || {}),
                type: 'bar'
            }
        ]
    };

    const option2: EChartsOption = {
        xAxis: {
            type: 'category',
            data: ['01.03.2026', '02.03.2026', '03.03.2026', '04.03.2026', '05.03.2026']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'Tasks',
                data: [2, 3, 4, 3, 5],
                type: 'line'
            },
            {
                name: 'Achivment',
                data: [1, 2, 3],
                type: 'line'
            }
        ]
    };

    const option3: EChartsOption = {
        // title: {
        //     text: 'Referer of a Website',
        //     subtext: 'Fake Data',
        //     left: 'center'
        // },
        tooltip: {
            trigger: 'item'
        },
        // legend: {
        //     orient: 'vertical',
        //     left: 'left'
        // },
        series: [
            {
                name: 'Radius Mode',
                type: 'pie',
                radius: 100,
                // center: ['25%', '50%'],
                // roseType: 'radius',
                // itemStyle: {
                //     borderRadius: 5
                // },
                label: {
                    show: false
                },
                emphasis: {
                    label: {
                        show: true
                    }
                },
                data: [
                    { value: 40, name: 'rose 1' },
                    { value: 33, name: 'rose 2' },
                    { value: 28, name: 'rose 3' },
                    { value: 22, name: 'rose 4' },
                    { value: 20, name: 'rose 5' },
                    { value: 15, name: 'rose 6' },
                    { value: 12, name: 'rose 7' },
                    { value: 10, name: 'rose 8' }
                ]
            },
            {
                name: 'Area Mode',
                type: 'pie',
                radius: 100,
                // center: ['75%', '50%'],
                // roseType: 'area',
                // itemStyle: {
                //     borderRadius: 5
                // },
                data: [
                    { value: 30, name: 'rose 1' },
                    { value: 28, name: 'rose 2' },
                    { value: 26, name: 'rose 3' },
                    { value: 24, name: 'rose 4' },
                    { value: 22, name: 'rose 5' },
                    { value: 20, name: 'rose 6' },
                    { value: 18, name: 'rose 7' },
                    { value: 16, name: 'rose 8' }
                ]
            }
        ]
    };


    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken()

    const { isPending, error, data: users, isFetching, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        select: (data) => data?.map(({ full_name, id }) => ({
            key: id,
            // icon: React.createElement(icon),
            label: full_name

        })).filter(user => user.label !== 'admin') || [],
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

    const userTabs: TabsProps['items'] = [
        {
            key: 'timeline',
            label: 'Timeline',
            children: <Points userId={activeUser || ''} />,
        },
        {
            key: 'dashboard',
            label: 'Dashboard',
            children: <UserDashboard userId={activeUser || ''} />
        },
    ];
    const allTabs: TabsProps['items'] = [
        {
            key: '1',
            label: 'Dashboard',
            children: <MainDashboard points={points} />
        }
    ];

    if (!userData?.role) {
        return <Flex align='center' justify='center'>
            <Spin spinning />
        </Flex>
    }

    return <Layout style={{ height: '100%' }}>
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
                    style={{ height: '100%', borderInlineEnd: 0 }}
                    items={[{ key: 'all', label: 'Все пользователи' }, ...(users || [])]}
                    onSelect={(info) => {
                        const key = info.key === 'all' ? null : info.key
                        setActiveUser(key)
                        console.log({ info })
                    }}
                />
                <AddUser />
            </Flex>
        </Layout.Sider>
        <Flex style={{ padding: '0 24px', width: '100%' }}>
            <Layout.Content
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                    overflow: 'auto'
                }}
            >
                <Tabs defaultActiveKey="1" items={activeUser ? userTabs : allTabs} />
            </Layout.Content>
        </Flex>
    </Layout >
}