import { type FC } from 'react'

import { Button, Result } from 'antd'

import { useNavigate } from 'react-router'

export const ForbiddenComponent: FC = () => {
    const navigate = useNavigate()
    return <Result
        status="403"
        title="403"
        subTitle="Доступ запрещен"
        extra={<Button onClick={() => { navigate('/') }} type="primary">На главную</Button>}
    />
}
