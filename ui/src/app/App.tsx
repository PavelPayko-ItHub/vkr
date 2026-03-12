import { type FC } from 'react'

// import { Layout } from 'antd'

import { AppRouter } from '../components/app-router'

import './index.css'
import ruRu from 'antd/locale/ru_RU';
import { ConfigProvider } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const App: FC = () => {
    const queryClient = new QueryClient()
    return (
        <ConfigProvider
            locale={ruRu}
            theme={{
                token: {
                    // colorPrimary: '#DAA520',
                    // colorTextHeading: '#DC143C',
                    // colorText: '#DC143C',
                    // fontSize: 16,
                    // fontSizeHeading1: 36,                
                    // fontSizeHeading2: 24,                
                    // fontSizeHeading3: 18,                
                    // fontSizeSM: 12,
                    fontFamily: 'Inter'
                }
            }}
        >
            <QueryClientProvider client={queryClient}>
                <div className={'app'}>
                    <AppRouter />
                </div>
            </QueryClientProvider>
        </ConfigProvider>
    )
}
