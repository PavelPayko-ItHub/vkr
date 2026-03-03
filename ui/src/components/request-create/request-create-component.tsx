import { type FC } from 'react'

import { type IRequestCardProps } from './request-create-types'
import { Card, DatePicker, Flex, Form, message, Select } from 'antd'
import type { AxiosError } from 'axios';
import { instanceAxios } from '../../core/api/axios';
import { NavLink, useNavigate } from 'react-router';
import type { IRequest } from '../../core/types/points';
import { paymentOptions, roomOptions } from './request-create-configs';
import Icon, { LeftOutlined } from '@ant-design/icons';

export const RequestCreateComponent: FC<IRequestCardProps> = () => {
    const navigate = useNavigate();

    const handleSubmit = (values: IRequest['content']) => {
        instanceAxios
            .post('/api/requests', { content: values })
            .then(() => {
                message.success("Заявка успешно создана")
                navigate('/')
            })
            .catch((err: AxiosError<{ error: string }>) => {
                console.log({ err });
                message.error(err?.response?.data?.error)
            })
    }

    return <Flex justify='center' align='center'>
        <Flex vertical gap={8}>

            <NavLink to={'/'}><LeftOutlined />назад ко всем заявкам</NavLink>
            <Card style={{ width: 600 }}>
                <Form<IRequest['content']>
                    name='new-request'
                    onFinish={handleSubmit}
                >
                    <Form.Item name={'room'} label={'Выберите помещение'}>
                        <Select options={roomOptions} />
                    </Form.Item>
                    <Form.Item name={'start_time'} label={'Выберите дату начала'}>
                        <DatePicker />
                    </Form.Item>
                    <Form.Item name={'payment_method'} label={'Выберите способ оплаты'}>
                        <Select options={paymentOptions} />
                    </Form.Item>
                </Form>
            </Card>
        </Flex>
    </Flex>
}