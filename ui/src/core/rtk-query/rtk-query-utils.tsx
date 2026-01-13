import { type FetchBaseQueryArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery'
import { type BaseQueryApi, type FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { type AllTagsTypes } from './rtk-query-api'
import { API_URL } from './rtk-query-constants'
import type { IExtraOptions } from './rtk-query-types'

export const baseQuery = async (
    args: FetchArgs,
    api: BaseQueryApi,
    extraOptions: IExtraOptions = {}
) => {
    const query = await fetchBaseQuery({
        baseUrl: API_URL,
        // prepareHeaders: setAuthHeaders,
        paramsSerializer: serializeUriParams
    })(args, api, extraOptions)

    return {
        ...query,
        meta: {
            ...query.meta,
            responseError: query.error,
            extraOptions
        }
    }
}

export const serializeUriParams: FetchBaseQueryArgs['paramsSerializer'] = (params) => {
    const decodedURIParams: Record<string, Record<'oldKey' | 'value', string>> = {}

    Object.entries(params).forEach(([key, value]) => {
    // ниже удалим пустые значения
        if (value === null || value === undefined) {
            decodedURIParams[key] = {
                oldKey: key,
                value
            }
        } else if (Array.isArray(value)) {
            value.forEach((val, idx) => {
                decodedURIParams[`${key}[${idx}]`] = {
                    oldKey: key,
                    value: decodeURIComponent(val.toString())
                }
            })
            // {filters: field: value} --> filters[field]
        } else if (typeof value === 'object' && value !== null) {
            Object.entries(value as Record<string, any>).forEach(([subKey, subValue]) => {
                // {filters: field: value[]} --> filters[field][0], filters[field][1]
                if (Array.isArray(subValue)) {
                    subValue.forEach((val, idx) => {
                        decodedURIParams[`${key}[${subKey}][${idx}]`] = {
                            oldKey: key,
                            value: decodeURIComponent(val.toString())
                        }
                    })
                } else {
                    const paramValue = typeof subValue === 'boolean'
                        ? subValue
                        : subValue || ''

                    decodedURIParams[`${key}[${subKey}]`] = {
                        oldKey: key,
                        value: decodeURIComponent(paramValue.toString())
                    }
                }
            })
        }
    })

    if (!Object.keys(decodedURIParams).length) {
        const newSearchParams = Object.entries(params).filter(([_, value]) => value)

        return new URLSearchParams(newSearchParams).toString()
    }
    const newSearchParams = new URLSearchParams(params)
    const decodedURIString: string[] = []
    Object.entries(decodedURIParams).forEach(([key, param]) => {
        newSearchParams.delete(param.oldKey)

        if (param.value || typeof param.value === 'boolean') {
            decodedURIString.push(`${key}=${param.value}`)
        }
    })

    return `${newSearchParams.toString()}&${decodedURIString.join('&')}`
}

export const generateRTKTagUtils = (tagName: typeof AllTagsTypes[number]) => {
    // Генерирует теги для массива объектов с ID и добавляет общий тег 'LIST'
    // Частые кейсы:
    // Получение списка чего-то - provides\GET ALL query all
    const providesTagsWithId = <T extends Array<{ id: string | number }>>(
        result?: T | null
    ): Array<{ type: typeof tagName, id: string | number }> => {
        return result && Array.isArray(result)
            ? [
                ...result.map(({ id }) => ({
                    type: tagName,
                    id
                })),
                { type: tagName, id: 'LIST' }
            ]
            : [{ type: tagName, id: 'LIST' }]
    }

    // Для обновления одного объекта без инвалидации списка (например, при получении деталей объекта)
    // Частые кейсы:
    // Получение конктретного элеменита - provides\GET query single
    const updateSingleWithoutListTag = (id: string | number) => [
        { type: tagName, id }
    ]

    // Для обновления одного объекта с инвалидацией списка (например, при изменении объекта)
    // Частые кейсы:
    // Редактирование конктретного элеменита - invalidate\EDIT mutation single
    const updateSingleWithListTag = (id: string | number) => [
        { type: tagName, id },
        { type: tagName, id: 'LIST' }
    ]

    // Инвалидация только списка без указания конкретного объекта
    // Частые кейсы:
    // Добавление в список конктретного элеменита - invalidate\ADD mutation single
    // Удаление конктретного элеменита - invalidate\DELETE mutation single
    const invalidatesListTag = () => [{ type: tagName, id: 'LIST' }]

    return {
        providesTagsWithId,
        updateSingleWithoutListTag,
        updateSingleWithListTag,
        invalidatesListTag
    }
}
