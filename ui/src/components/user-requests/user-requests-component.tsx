import { useCallback, useEffect, useState, type FC } from 'react'

import { type IMainProps } from './user-requests-types'
import { instanceAxios } from '../../core/api/axios'
import { Button, Card, Carousel, Divider, Flex, Image, Typography } from 'antd'
import { Feedback } from '../feedback'
import { RequestCard } from '../request-card'
import type { IRequest } from '../../core/types/points'
import { useNavigate } from 'react-router'
import { Slider } from '../slider'

export const UserRequestsComponent: FC<IMainProps> = () => {
    const navigate = useNavigate()

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


    const handleCreateRequest = () => {
        navigate('/request')
    };


    return <Flex vertical justify='center' gap={8}>
        <Slider />

        <Flex justify='space-between' gap={8} align='center'>
            <Typography.Title>Все заявки</Typography.Title>

            <Flex gap={8}>
                <Button onClick={handleCreateRequest} type='primary'>Создать заявку</Button>
            </Flex>

        </Flex>
        {data.length
            ? data.map(item => (
                <Card key={item.id}>
                    <Flex vertical>
                        <RequestCard data={item} />

                        <Divider />

                        {
                            item.status === 'completed'
                                ? <Feedback requestId={item.id} />
                                : null
                        }
                    </Flex>
                </Card>
            ))
            : 'Вы не оставили ни одной заявки'
        }
    </Flex>
}