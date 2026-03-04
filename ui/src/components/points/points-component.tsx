import { useState, type FC } from 'react'

import {
    CheckCircleOutlined, ClockCircleOutlined, DownOutlined, PlusOutlined, RiseOutlined,
    UpOutlined
} from '@ant-design/icons'
import {
    Button,
    Dropdown,
    Empty,
    Flex,
    Layout, Menu, type MenuProps, theme,
    Timeline,
    Typography
} from 'antd'

import { type IPointsProps } from './points-types'
import { useQuery } from '@tanstack/react-query'
import { instanceAxios } from 'core/api/axios'
import { AddUser } from 'components/add-user'
import { AddPoint } from 'components/add-point'
import type { IPoint, IPointCreate } from 'core/types/points'
import { Point } from 'components/point/point-component'

const {
    Header, Content, Footer, Sider
} = Layout

const mockItems = [
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
            style={{ fontSize: 24, color: 'green' }} />
    },
    {
        title: '2015-09-01',
        content: 'Network problems being solved',
        icon: <RiseOutlined color='green'
            size={48}
            style={{ fontSize: 16, color: 'grey' }} />
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
            }} />

    }
]

// const Point: FC<{ content: string }> = ({
//     content
// }) => {

//     const [isCollapsed, setIsCollapsed] = useState(true)

//     return <Flex vertical>
//         <Flex style={{ height: '100px' }} gap={4} onClick={() => setIsCollapsed((prev) => !prev)}>
//             {content}
//             {isCollapsed ? <DownOutlined /> : <UpOutlined />}
//         </Flex >
//         <Typography.Text hidden={isCollapsed}>Описание</Typography.Text>
//     </Flex>
// }
export const PointsComponent: FC<IPointsProps> = ({
    userId
}) => {
    console.log({ userId });

    const getIcon = (type: IPoint['type'], status: IPoint['status']) => {
        if (type === 'point') {
            switch (status) {
                case 'new':
                    return;
                case 'in_progress':
                    return <ClockCircleOutlined />
                case 'completed':
                    return <CheckCircleOutlined />

                default:
                    return;
            }
        }

        return status === 'completed'
            ? <RiseOutlined
                size={48}
                style={{ fontSize: 24, color: 'green' }} />
            : <RiseOutlined
                size={48}
                style={{ fontSize: 16, color: 'grey' }}
            />
    }

    const { isPending, error, data, isFetching, isLoading } = useQuery({
        queryKey: ['userPoints', userId],
        queryFn: async () => {
            const response = await instanceAxios.get(`/api/users/${userId}/points`)
            // const response = await instanceAxios.get(`/api/points`)
            return response
        },
        select: (data: IPoint[]) => data?.data?.map((point) => ({
            title: new Date(point.deadline).toLocaleDateString(),
            content: <Point data={point} />,
            icon: getIcon(point.type, point.status)
        })) || [],
    })


    console.log({ data })

    // const items: MenuProps['items'] = data?.data.map(({ name, userId }) => ({
    //     key: String(userId + 1),
    //     // icon: React.createElement(icon),
    //     label: `${name}`

    // })) || []

    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken()

    return <Content
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
            {data?.length
                ? <Timeline
                    // orientation='horizontal'
                    items={data}
                // mode="alternate"
                />
                : <Empty />
            }

            <Flex align='center'
                gap={8}>
                {/* <Button
                    icon={<PlusOutlined />}
                    shape='circle'
                    type='dashed'
                /> */}
                <AddPoint userId={userId} />
            </Flex>
        </Flex>
    </Content>
}

// 1 - выполненый поинт -<CheckCircleOutlined />
// 2- запланированный поинт
// 3 - в процессе - <ClockCircleOutlined />

// 4 - полученное достижение - <RiseOutlined />
// 5- планируемое достижение
