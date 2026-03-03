import { useCallback, useEffect, useState, type FC } from 'react'

import { type IMainProps } from './admin-panel-types'
import { instanceAxios } from '../../core/api/axios'
import { Button, Card, Divider, Dropdown, Flex, message, Typography, type MenuProps } from 'antd'
import { RequestCard } from '../request-card'
import type { IRequest } from '../../core/types/points'

export const AdminPanelComponent: FC<IMainProps> = () => {

    const [data, setData] = useState<IRequest[]>([])

    const getRequests = useCallback(() => {
        return instanceAxios.get('/api/requests')
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => {
                console.log({ err });
            })
    }, [])

    useEffect(() => {
        getRequests()

    }, [getRequests])

    const updateStatusHandler = (id: string, status: IRequest['status']) => {
        instanceAxios
            .put(`/api/requests/${id}/status`, { status })
            .then(() => {
                message.success('Статус успешно обновлен')
                getRequests()
            })
            .catch((err) => {
                message.success('Статус не обновлен, повторите позже')
                console.error({ err });
            })
    }
    const getStatusItems = (id: string): MenuProps['items'] => ([
        { key: `${id}-assigned`, label: 'Мероприятие назначено', onClick: () => { updateStatusHandler(id, 'assigned') } },
        { key: `${id}-completed`, label: 'Мероприятие завершено', onClick: () => { updateStatusHandler(id, 'completed') } }
    ])

    return <Flex vertical>
        <Flex justify='space-between'>
            <Typography.Title>Все заявки (Админ)</Typography.Title>
            <Button onClick={getRequests}>Обновить</Button>
        </Flex>

        {data.length
            ? data.map(item => (
                <Card key={item.id}>
                    <Flex vertical>
                        <RequestCard data={item} />

                        <Divider />

                        <Dropdown menu={{ items: getStatusItems(item.id) }} trigger={['click']}>
                            <Button style={{ width: 'max-content' }}>
                                Обновить статус
                            </Button>
                        </Dropdown>
                    </Flex>
                </Card>
            ))
            : 'В системе еще нет заявок'
        }
    </Flex>
}