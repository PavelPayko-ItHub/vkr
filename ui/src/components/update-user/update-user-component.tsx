import { useState, type FC } from 'react'

import {
    Button,
    Form,
    Input,
    Modal,
    Select,
    Typography,
    type SelectProps
} from 'antd'

import { type IUpdateUserProps } from './update-user-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { instanceAxios } from 'core/api/axios'
import type { IUserUpdate } from 'core/types/user'
import type { AxiosError } from 'axios'


export const UpdateUserComponent: FC<IUpdateUserProps> = ({
    data
}) => {
    const queryClient = useQueryClient()
    const [isOpen, setIsOpen] = useState(false)

    const userMutation = useMutation({
        mutationFn: async (userData: IUserUpdate) => {
            const response = await instanceAxios.put(`/api/users/${data.id}`, userData)
            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
            closeHandler()
        },
    })

    const submitHandler = (values: IUserUpdate) => {
        userMutation.mutate(values)
    }

    const openHandler = () => {
        setIsOpen(true)
    }

    const closeHandler = () => {
        setIsOpen(false)
    }

    const roleOptions: SelectProps['options'] = [
        { value: 'admin,', label: 'Администратор' },
        { value: 'user', label: 'Сотрудник' },
    ]


    return <>
        <Button onClick={openHandler} type='link'>Изменить</Button>

        <Modal
            title={'Изменить пользователя'}
            open={isOpen}
            onCancel={closeHandler}
            okButtonProps={{ htmlType: 'submit', form: 'update-user', loading: userMutation.isPending }}
            destroyOnHidden
        >
            <Form<IUserUpdate>
                name='update-user'
                onFinish={submitHandler}
                layout='vertical'
                initialValues={data}
            >
                <Form.Item
                    name={'full_name'}
                    label={'Имя'}
                    rules={[{ required: true, message: 'Введите полное имя' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={'email'}
                    label={'Почта'}
                    rules={[
                        { required: true, message: 'Введите почту' },
                        { pattern: /^\S+@\S+\.\S+$/, message: 'Некорректный email' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={'phone'}
                    label={'Телефон'}
                    rules={[
                        { pattern: /^8\(\d{3}\)\d{3}-\d{2}-\d{2}$/, message: 'Введите телефон в формате 8(XXX)XXX-XX-XX' },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name={'role'}
                    label={'Роль'}
                >
                    <Select options={roleOptions} />
                </Form.Item>

                {userMutation.isError &&
                    <Typography.Text type='danger'>{(userMutation?.error as AxiosError<{ error: string }>)?.response?.data?.error}</Typography.Text>
                }
            </Form>
        </Modal>
    </>
}