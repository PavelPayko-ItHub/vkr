import { type FC } from 'react'

import {
    Button,
    Popconfirm
} from 'antd'

import { type IDeleteUserProps } from './delete-user-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { instanceAxios } from 'core/api/axios'

export const DeleteUserComponent: FC<IDeleteUserProps> = ({
    id
}) => {
    const queryClient = useQueryClient()

    const userMutation = useMutation({
        mutationFn: async () => {
            const response = await instanceAxios.delete(`/api/users/${id}`)
            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
    })

    const deleteHandler = () => {
        userMutation.mutate()
    }

    return <Popconfirm
        title='Удалить пользователя ?'
        okText='Удалить'
        onConfirm={deleteHandler}
    >
        <Button type='link' danger>Удалить</Button>
    </Popconfirm>
}