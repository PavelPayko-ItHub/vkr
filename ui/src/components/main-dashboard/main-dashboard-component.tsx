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
import type { IMainDashboardProps } from './main-dashboard-types'
import { Flex } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { instanceAxios } from 'core/api/axios'

export const MainDashboardComponent: FC<IMainDashboardProps> = ({
    points
}) => {

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

// 1 - выполненый поинт -<CheckCircleOutlined />
// 2- запланированный поинт
// 3 - в процессе - <ClockCircleOutlined />

// 4 - полученное достижение - <RiseOutlined />
// 5- планируемое достижение
