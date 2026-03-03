import { type FC } from 'react'

import { Flex, Typography } from 'antd'

import styles from './not-found.module.css'

export const NotFoundComponent: FC = () => {
    return (
        <Flex align={'center'}
            vertical
            className={styles.page}>
            <Typography.Title level={2}>
        Упс! Страница не найдена
            </Typography.Title>
        </Flex>
    )
}
