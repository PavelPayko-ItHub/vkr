import { type FC } from 'react'

import { type IRequestCardProps } from './request-card-types'
import { Flex, Typography } from 'antd'

export const RequestCardComponent: FC<IRequestCardProps> = ({
  data
}) => {

  const roomDict = {
    auditorium: 'аудитория',
    coworking: 'коворкинг',
    cinema: 'кинозал'
  }
  const paymentDict = {
    cash: 'наличными',
    transfer: 'переводом по номеру телефона',
  }
  const statusDict = {
    new: 'Новая',
    assigned: 'Мероприятие назначено',
    completed: 'Мероприятие завершено',
  }

  return <Flex vertical gap={4}>
    <Flex gap={8}>
      <Typography.Text type='secondary'>Помещение:</Typography.Text>
      <Typography.Text >{roomDict[data?.content?.room] || '-'}</Typography.Text>
    </Flex>
    <Flex gap={8}>
      <Typography.Text type='secondary'>Оплата:</Typography.Text>
      <Typography.Text>{paymentDict[data?.content?.payment_method]}</Typography.Text>
    </Flex>
    <Flex gap={8}>
      <Typography.Text type='secondary'>Старт:</Typography.Text>
      <Typography.Text>{new Date(data?.content?.start_time).toLocaleString() || '-'}</Typography.Text>
    </Flex>
    <Flex gap={8}>
      <Typography.Text type='secondary'>Статус:</Typography.Text>
      <Typography.Text>{statusDict[data?.status] || '-'}</Typography.Text>
    </Flex>
  </Flex>
}