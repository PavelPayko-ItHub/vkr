import { useState, type FC } from 'react'

import { type IFeedbackProps } from './feedback-types'
import { instanceAxios } from '../../core/api/axios'
import { Button, Flex, Form, Input, message, Modal } from 'antd'
import type { AxiosError, AxiosResponse } from 'axios'

export const FeedbackComponent: FC<IFeedbackProps> = ({
    requestId
}) => {

    const [feedBackData, setFeedbackData] = useState('')
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const getFeedback = () => {
        setIsLoading(true)
        instanceAxios
            .get(`/api/requests/${requestId}/feedback`)
            .then((res: AxiosResponse<{ content: string }>) => {
                setFeedbackData(res?.data?.content || '')
            })
            .catch((err: AxiosError<{ error: string }>) => {
                console.log({ err });
                message.error(err?.response?.data?.error)
            })
        setIsLoading(false)
    }



    const handleOpen = () => {
        getFeedback()
        setIsOpen(prev => !prev)
    }
    const handleClose = () => {
        setIsOpen(prev => !prev)
    }
    const handleSubmit = (values: { content: string }) => {
        instanceAxios.post(`/api/requests/${requestId}/feedback`, { ...values })
            .then(() => {
                message.success('Отзыв успешно отправлен')
                handleClose()
            })
            .catch((err: AxiosError<{ error: string }>) => {
                console.log({ err });
                message.error(err?.response?.data?.error)
            })
    }

    return <Flex vertical gap={8}>
        <Button onClick={handleOpen} style={{width: 'max-content'}}>Оставить отзыв</Button>
        
        <Modal
            open={isOpen}
            onCancel={handleClose}
            onOk={handleClose}
            loading={isLoading}
            title={'Ваш отзыв'}
        >
            {feedBackData
                ? feedBackData

                : <Form onFinish={handleSubmit}>
                    <Flex vertical gap={4}>
                        <Form.Item name={'content'}>
                            <Input.TextArea />
                        </Form.Item>

                        <Button style={{ width: 'max-content' }} type='primary' htmlType='submit'>Отправить</Button>
                    </Flex>
                </Form>
            }
        </Modal>

    </Flex>
}