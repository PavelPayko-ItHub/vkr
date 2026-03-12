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
import type { FC } from 'react'
import type { IUserDashboardProps } from './user-dashboard-types'
import { Flex } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { fetchUsersPoints } from 'core/api/points-api'

const statusDict: Record<string, string> = {
    new: 'Новые',
    in_progress: 'Назначенные',
    completed: 'Выполненные'
}


export const UserDashboardComponent: FC<IUserDashboardProps> = ({
    userId
}) => {
    const { data } = useQuery<IPoint[]>({
        queryKey: ['userPoints', userId],
        queryFn: () => fetchUsersPoints(userId)
    })

    echarts.use([
        BarChart,
        LineChart,
        PieChart,
        LegendComponent,
        TooltipComponent,
        GridComponent,
        MarkLineComponent,
        CanvasRenderer,
        DataZoomComponent,
        ToolboxComponent
    ])

    const lineData = data?.reduce((acc, item) => {
        const lastPoint = acc.point[acc.point.length - 1] || 0
        const lastAchievement = acc.achievement[acc.achievement.length - 1] || 0

        if (item.type === 'achievement') {
            acc.achievement.push(lastAchievement + 1)
            acc.point.push(lastPoint)

            return acc
        }

        acc.point.push(lastPoint + 1)
        acc.achievement.push(lastAchievement)

        return acc
    }, { point: [], achievement: [] } as { point: number[], achievement: number[] }) || { point: [], achievement: [] }

    const pieAchievementValues = data?.filter(item => item.type === 'achievement')?.reduce((acc, item) => {
        const key = item.status

        if (acc[key]) {
            acc[key] = acc[key] + 1
            return acc
        }

        acc[key] = 1

        return acc
    }, {} as Record<string, number>) || {}

    const piePointValues = data?.filter(item => item.type === 'point')?.reduce((acc, item) => {
        const key = item.status

        if (acc[key]) {
            acc[key] = acc[key] + 1
            return acc
        }

        acc[key] = 1

        return acc
    }, {} as Record<string, number>) || {}

    const piePointData = Object.entries(piePointValues).map(([key, value]) => ({
        name: `${statusDict[key]} цели`,
        value
    }))
    const pieAchievementData = Object.entries(pieAchievementValues).map(([key, value]) => ({
        name: `${statusDict[key]} достижения`,
        value
    }))

    const lineOption: EChartsOption = {
        xAxis: {
            type: 'category',
            data: data?.map(item => new Date(item.deadline).toLocaleDateString()) || []
        },
        yAxis: {
            type: 'value'
        },
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                name: 'Tasks',
                data: lineData.point,
                type: 'line'
            },
            {
                name: 'Achievements',
                data: lineData.achievement,
                type: 'line'
            }
        ]
    };

    const pointPieOption: EChartsOption = {
        title: {
            text: 'Цели',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                name: 'цели',
                type: 'pie',
                radius: 100,
                center: ['50%', '50%'],
                data: piePointData
            }
        ]
    };
    const achievementPieOption: EChartsOption = {
        title: {
            text: 'Достижения',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                name: 'достижения',
                type: 'pie',
                radius: 100,
                center: ['50%', '50%'],
                data: pieAchievementData
            }
        ]
    };

    return <Flex vertical style={{ height: '100%' }} gap={8}>
        <Flex style={{ height: '300px' }}>
            <ReactEChartsCore
                echarts={echarts}
                option={lineOption}
                notMerge={true}
                style={{ height: '300px', width: '100%' }}
                opts={{ locale: 'ru-RU' }}
            />
        </Flex>
        <Flex style={{}}>
            <ReactEChartsCore
                echarts={echarts}
                option={pointPieOption}
                style={{ height: '300px', width: '50%' }}
                opts={{ locale: 'ru-RU' }}
            />
            <ReactEChartsCore
                echarts={echarts}
                option={achievementPieOption}
                style={{ height: '300px', width: '50%' }}
                opts={{ locale: 'ru-RU' }}
            />
        </Flex>
    </Flex >
}