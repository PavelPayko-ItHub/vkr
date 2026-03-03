import { type FC } from 'react'

import { NavLink, useNavigate } from 'react-router'

import { Button, Card, Flex, Form, Input, message, Typography } from 'antd'
import { instanceAxios } from '../../core/api/axios'
import type { IUser, IUserCreate } from '../../core/types/user'
import type { AxiosError, AxiosResponse } from 'axios'

// import styles from './auth.module.css'

export const AuthComponent: FC = () => {
    const navigate = useNavigate();

    const submitHandler = (values: IUserCreate) => {
        instanceAxios
            .post('api/login', {...values})
            .then((res: AxiosResponse<{user: IUser, token: string}>) => {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('user', JSON.stringify(res.data.user || {}))
                navigate('/')
            })
            .catch((err: AxiosError<{error: string}>) => {
                console.log({err});
                message.error(err?.response?.data?.error)
            })
    }

    return <Flex justify='center' align='center'>
        <Card style={{ width: 600 }}>
            <Form<IUserCreate> onFinish={submitHandler}>
                <Form.Item name={'login'} label={'login'}>
                    <Input />
                </Form.Item>
                <Form.Item name={'password'} label={'password'}>
                    <Input />
                </Form.Item>

                {}

                <Flex vertical gap={8}>
                    <Button htmlType='submit' type='primary' style={{width: 'max-content'}}>Войти</Button>
                    <Flex>
                        <Typography.Text>Еще не зарегистрированы? </Typography.Text>
                        <NavLink to={'/registration'}>Регистрация</NavLink>
                    </Flex>
                </Flex>
            </Form>
        </Card>
    </Flex>
}
