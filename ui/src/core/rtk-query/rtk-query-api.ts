import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQuery } from './rtk-query-utils'

export const AllTagsTypes = [
    // Dashboard
    'dashboard',
    'widget-info',
    'widget-data',
    'rules',
    // Events
    'tags', 'json-paths',
    'saved-queries',
    'events-settings',
    'events-data',
    'events-history',
    'events-sql-data',
    'events-iql-data',
    'events-iql-data-infinity',
    'events-sql-data-infinity',
    'events-merged-data',
    'json',
    'saved-queries',
    // Settings
    'users', 'user',
    'roles', 'tenants', 'shared-account',
    'ldap', 'smtp',
    'normalization', 'correlation',
    'buckets', 'bucket-file', 'storageTimeDays',
    // Monitoring
    'monitoring-rules',
    'monitoring-rule',
    'monitoring-problems',
    'monitoring-problem',
    'monitoring-problem-history',
    'monitoring-mail-templates',
    'monitoring-mail-template',
    'monitoring-external-queries-channels',
    'monitoring-external-queries-channel',
    'monitoring-external-queries-requests',
    'monitoring-external-queries-request'

] as const

export const rtkQueryApi = createApi({
    tagTypes: AllTagsTypes,
    reducerPath: 'rtkQueryApi',
    baseQuery,
    endpoints: () => ({})
})
