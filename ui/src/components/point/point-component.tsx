import { useState, type FC } from 'react'

import {
    DownOutlined,
    MoreOutlined,
    UpOutlined
} from '@ant-design/icons'
import {
    Button,
    DatePicker,
    Dropdown,
    Flex,
    Form,
    Input,
    Modal,
    Select,
    Typography,
    type SelectProps
} from 'antd'

import { type IPointProps } from './point-types'

import styles from './point.module.css'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { instanceAxios } from 'core/api/axios'
import type { IPointUpdate } from 'core/types/points'
import type { AxiosError } from 'axios'
import dayjs from 'dayjs'

export const Point: FC<IPointProps> = ({
    data
}) => {

    console.log({ point: data });


    const [isOpen, setIsOpen] = useState(false)

    const queryClient = useQueryClient()
    const pointMutation = useMutation({
        mutationFn: async (pointData: IPointUpdate) => {
            const response = await instanceAxios.put(`/api/points/${data.id}`, pointData)
            return response
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['userPoints', data.user_id] })
            closeHandler()
        },
    })

    const submitHandler = (values: IPointUpdate) => {
        pointMutation.mutate(values)
    }

    const openHandler = () => {
        setIsOpen(true)
    }

    const closeHandler = () => {
        setIsOpen(false)
    }

    console.log({ pointMutation });

    // 'new', 'in_progress', 'completed', 'new_achievement', 'completed_achievement'
    const statusOptions: SelectProps['options'] = [
        { value: 'new', label: 'Новый' },
        { value: 'in_progress', label: 'Выполняется' },
        { value: 'completed', label: 'Выполнен' },
    ]

    const typeOptions: SelectProps['options'] = [
        { value: 'point', label: 'Цель' },
        { value: 'achievement', label: 'Достижение' },
    ]


    return <>
        <Flex className={styles.item} gap={8}>
            {data.description}

            <Dropdown menu={{
                items: [
                    { type: 'item', key: 'edit', label: 'Изменить', onClick: openHandler }
                ]
            }}>
                <Button className={styles.btn} size='small' icon={<MoreOutlined />} />
            </Dropdown>
        </Flex>

        <Modal
            title={'Изменить точку'}
            open={isOpen}
            onCancel={closeHandler}
            okButtonProps={{ htmlType: 'submit', form: 'edit-point', loading: pointMutation.isPending }}
            destroyOnHidden
        >
            <Form<IPointUpdate>
                name='edit-point'
                onFinish={submitHandler}
                layout='vertical'
                initialValues={data}
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
                    rules={[
                        // { required: true, message: 'Введите пароль' },
                        // { min: 8, message: 'Не менее 8 символов' }
                    ]}
                    required
                    getValueProps={(value) => ({ value: value ? dayjs(value) : "", })}
                >
                    <DatePicker />
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

                <Form.Item
                    name={'status'}
                    label={'Статус'}
                    required
                    rules={[
                        { required: true, message: 'Выберите тип' }
                    ]}
                >
                    <Select options={statusOptions} />
                </Form.Item>

                {pointMutation.isError &&
                    <Typography.Text type='danger'>{(pointMutation?.error as AxiosError<{ error: string }>)?.response?.data?.error}</Typography.Text>
                }
            </Form>
        </Modal>
    </>
}