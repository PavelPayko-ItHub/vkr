import { useState, type FC } from 'react'

import {
    Button,
    DatePicker,
    Form,
    Input,
    message,
    Modal,
    Select,
    Typography,
    type SelectProps
} from 'antd'

import { type IAddPointProps } from './add-point-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { instanceAxios } from 'core/api/axios'
import type { AxiosError } from 'axios'
import { PlusOutlined } from '@ant-design/icons'
import type { IPointCreate } from 'core/types/points'
import dayjs from 'dayjs'


export const AddPointComponent: FC<IAddPointProps> = ({
    userId
}) => {
    const queryClient = useQueryClient()
    const [isOpen, setIsOpen] = useState(false)

    const pointMutation = useMutation({
        mutationFn: async (pointData: IPointCreate) => {
            const payload = { ...pointData, deadline: dayjs(pointData.deadline).set('hours', 12) }
            const response = await instanceAxios.post('/api/points', payload)
            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userPoints', userId] })
            message.success('Точка успешно добавлена')
            closeHandler()
        },
    })

    const submitHandler = (values: IPointCreate) => {
        pointMutation.mutate({ ...values, user_id: userId })
    }

    const openHandler = () => {
        setIsOpen(true)
    }

    const closeHandler = () => {
        setIsOpen(false)
    }

    const typeOptions: SelectProps['options'] = [
        { value: 'point', label: 'Цель' },
        { value: 'achievement', label: 'Достижение' },
    ]


    return <>
        <Button
            icon={<PlusOutlined />}
            shape='circle'
            type='dashed'
            onClick={openHandler}
        />
        <Modal
            title={'Добавить точку'}
            open={isOpen}
            onCancel={closeHandler}
            okButtonProps={{ htmlType: 'submit', form: 'create-point', loading: pointMutation.isPending }}
            destroyOnHidden
        >
            <Form<IPointCreate>
                name='create-point'
                onFinish={submitHandler}
                layout='vertical'
                clearOnDestroy
            >
                <Form.Item
                    name={'type'}
                    label={'Тип'}
                    required
                    rules={[
                        { required: true, message: 'Выберите тип' }
                    ]}
                >
                    <Select options={typeOptions} />
                </Form.Item>

                <Form.Item
                    name={'deadline'}
                    label={'Время выполнения'}
                    required
                >
                    <DatePicker format={'YYYY-MM-DD'} />
                </Form.Item>

                <Form.Item
                    name={'description'}
                    label={'Описание'}
                    rules={[
                        { required: true, message: 'Введите описание' },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>

                {pointMutation.isError &&
                    <Typography.Text type='danger'>{(pointMutation?.error as AxiosError<{ error: string }>)?.response?.data?.error}</Typography.Text>
                }
            </Form>
        </Modal>
    </>
}