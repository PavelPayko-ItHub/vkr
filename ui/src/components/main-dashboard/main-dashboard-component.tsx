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
import type { IUserPoint } from 'core/types/points'
import type { FC } from 'react'
import type { IMainDashboardProps } from './main-dashboard-types'
import { useQuery } from '@tanstack/react-query'
import { fetchPoints } from 'core/api/points-api'

export const MainDashboardComponent: FC<IMainDashboardProps> = () => {

    const { data: points } = useQuery({
        queryKey: ['userPoints'],
        queryFn: fetchPoints,
        select: (data: IUserPoint[]) => data?.reduce((acc, point) => {
            const key = point.full_name

            if (acc[key]) {
                acc[key] = acc[key] + 1
                return acc
            }

            acc[key] = 1

            return acc
        }, {} as Record<string, number>) || {}
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



    const option: EChartsOption = {
        xAxis: {
            type: 'category',
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
                data: Object.values(points || {}),
                type: 'bar'
            }
        ]
    };



    return <div style={{ height: '300px' }}>
        <ReactEChartsCore
            echarts={echarts}
            option={option}
            notMerge={true}
            style={{ height: '300px' }}
            opts={{ locale: 'ru-RU' }}
        />
    </div>
}