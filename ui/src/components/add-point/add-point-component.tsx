import { useState, type FC } from 'react'

import {
    Button,
    DatePicker,
    Form,
    Input,
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


export const AddPointComponent: FC<IAddPointProps> = ({
    userId
}) => {
    const queryClient = useQueryClient()
    const [isOpen, setIsOpen] = useState(false)

    const pointMutation = useMutation({
        mutationFn: async (pointData: IPointCreate) => {
            const response = await instanceAxios.post('/api/points', pointData)
            return response
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['userPoints', userId] })
            closeHandler()
        },
    })

    const submitHandler = (values: IPointCreate) => {
        console.log({ values });

        pointMutation.mutate(values)
    }

    const openHandler = () => {
        setIsOpen(true)
    }

    const closeHandler = () => {
        setIsOpen(false)
    }

    console.log({ pointMutation });

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
        >
            <Form<IPointCreate>
                name='create-point'
                onFinish={submitHandler}
                layout='vertical'
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
                    rules={[
                        // { required: true, message: 'Введите пароль' },
                        // { min: 8, message: 'Не менее 8 символов' }
                    ]}
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

// 1 - выполненый поинт -<CheckCircleOutlined />
// 2- запланированный поинт
// 3 - в процессе - <ClockCircleOutlined />

// 4 - полученное достижение - <RiseOutlined />
// 5- планируемое достижение
