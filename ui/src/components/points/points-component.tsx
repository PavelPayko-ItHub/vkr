import { type FC } from 'react'

import {
    CheckCircleOutlined, ClockCircleOutlined, RiseOutlined
} from '@ant-design/icons'
import {
    Empty,
    Flex,
    Layout, theme,
    Timeline
} from 'antd'

import { type IPointsProps } from './points-types'
import { useQuery } from '@tanstack/react-query'
import { AddPoint } from 'components/add-point'
import type { IPoint } from 'core/types/points'
import { Point } from 'components/point/point-component'
import { fetchUsersPoints } from 'core/api/points-api'


export const PointsComponent: FC<IPointsProps> = ({
    userId
}) => {
    const isAdmin = JSON.parse(localStorage.getItem('user') || '{}')?.role === 'admin'

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

    const { data } = useQuery({
        queryKey: ['userPoints', userId],
        queryFn: () => fetchUsersPoints(userId),
        select: (data: IPoint[]) => data?.map((point) => ({
            title: new Date(point.deadline).toLocaleDateString(),
            content: <Point data={point} />,
            icon: getIcon(point.type, point.status)
        })) || [],
    })

    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken()

    return <Layout.Content
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
                {isAdmin
                    ? <AddPoint userId={userId} />
                    : null
                }

            </Flex>
        </Flex>
    </Layout.Content>
}