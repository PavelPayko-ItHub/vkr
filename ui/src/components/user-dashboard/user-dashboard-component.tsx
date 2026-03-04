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
import { instanceAxios } from 'core/api/axios'

const statusDict = {
    new: 'Новые',
    in_progress: 'Назначенные',
    completed: 'Выполненные'
}


export const UserDashboardComponent: FC<IUserDashboardProps> = ({
    userId
}) => {
    console.log({ userId });

    const { isPending, error, data, isFetching, isLoading } = useQuery({
        queryKey: ['userPoints', userId],
        queryFn: async () => {
            const response = await instanceAxios.get(`/api/users/${userId}/points`)
            // const response = await instanceAxios.get(`/api/points`)
            return response
        },
        // select: (data: IPoint[]) => data?.data?.reduce((acc, point) => {
        //     const key = point.type

        //     if (acc[key]) {
        //         acc[key] = acc[key] + 1
        //         return acc
        //     }

        //     acc[key] = 1

        //     return acc
        // }, {}) || {}
    })

    // const 
    console.log({ data });



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

    const lineData = data?.data?.reduce((acc, item) => {
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
    }, { point: [], achievement: [] }) || { point: [], achievement: [] }

    const pieAchievementValues = data?.data?.filter(item => item.type === 'achievement')?.reduce((acc, item) => {
        const key = item.status

        if (acc[key]) {
            console.log('reduce if', item, acc);
            acc[key] = acc[key] + 1
            return acc
        }

        acc[key] = 1

        return acc
    }, {}) || {}

    const piePointValues = data?.data?.filter(item => item.type === 'point')?.reduce((acc, item) => {
        const key = item.status

        if (acc[key]) {
            console.log('reduce if', item, acc);
            acc[key] = acc[key] + 1
            return acc
        }

        acc[key] = 1

        return acc
    }, {}) || {}

    const piePointData = Object.entries(piePointValues).map(([key, value]) => ({
        name: `${statusDict[key]} цели`,
        value
    }))
    const pieAchievementData = Object.entries(pieAchievementValues).map(([key, value]) => ({
        name: `${statusDict[key]} достижения`,
        value
    }))
    console.log({ piePointData, pieAchievementData });



    const option2: EChartsOption = {
        xAxis: {
            type: 'category',
            // data: ['01.03.2026', '02.03.2026', '03.03.2026', '04.03.2026', '05.03.2026']
            data: data?.data?.map(item => new Date(item.deadline).toLocaleDateString()) || []
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
                center: ['25%', '50%'],
                // roseType: 'radius',
                // itemStyle: {
                //     borderRadius: 5
                // },
                // label: {
                //     show: false
                // },
                // emphasis: {
                //     label: {
                //         show: true
                //     }
                // },
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
                center: ['75%', '50%'],
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

    const optionBar1: EChartsOption = {
        title: {
            text: 'Цели',
            // subtext: 'Fake Data',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        // legend: {
        //     orient: 'vertical',
        //     left: 'left'
        // },
        series: [
            {
                name: 'цели',
                type: 'pie',
                radius: 100,
                center: ['50%', '50%'],
                // data: [
                //     { value: 2, name: 'Новые цели' },
                //     { value: 1, name: 'Выполняемые цели' },
                //     { value: 3, name: 'Выполенные цели' },
                // ]
                data: piePointData
                //     data: data.data.filter(item => item.type === 'point').reduce((acc, item) => {
                //                     const key = point.full_name
                // console.log('reduce', point, acc);

                // if (acc[key]) {
                //     console.log('reduce if', point, acc);
                //     acc[key] = acc[key] + 1
                //     return acc
                // }

                // acc[key] = 1

                // return acc
                //     }, [])
            }
        ]
    };
    const optionBar2: EChartsOption = {
        title: {
            text: 'Достижения',
            // subtext: 'Fake Data',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        // legend: {
        //     orient: 'vertical',
        //     left: 'left'
        // },
        series: [
            {
                name: 'достижения',
                type: 'pie',
                radius: 100,
                center: ['50%', '50%'],
                // data: [
                //     { value: 1, name: 'Планируемые достижения' },
                //     { value: 1, name: 'Полученные достижения ' },
                // ]
                data: pieAchievementData
            }
        ]
    };



    console.log({ data })
    console.log({ lineData })

    return <Flex vertical style={{ height: '100%' }} gap={8}>
        <Flex style={{ height: '300px' }}>
            <ReactEChartsCore
                echarts={echarts}
                option={option2}
                notMerge={true}
                style={{ height: '300px', width: '100%' }}
                opts={{ locale: 'ru-RU' }}
            />
        </Flex>
        <Flex style={{}}>
            <ReactEChartsCore
                echarts={echarts}
                option={optionBar1}
                // notMerge={true}
                style={{ height: '300px', width: '50%' }}
                opts={{ locale: 'ru-RU' }}
            />
            <ReactEChartsCore
                echarts={echarts}
                option={optionBar2}
                // notMerge={true}
                style={{ height: '300px', width: '50%' }}
                opts={{ locale: 'ru-RU' }}
            />
        </Flex>
    </Flex >
}

// 1 - выполненый поинт -<CheckCircleOutlined />
// 2- запланированный поинт
// 3 - в процессе - <ClockCircleOutlined />

// 4 - полученное достижение - <RiseOutlined />
// 5- планируемое достижение
