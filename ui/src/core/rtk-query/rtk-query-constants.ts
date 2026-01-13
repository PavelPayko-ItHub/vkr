
const ORIGIN_URL = window.location.origin

export const BASE_HOST = __IS_DEV__ ? 'localhost' : new URL(ORIGIN_URL).hostname
export const BASE_PROTOCOL = new URL(ORIGIN_URL).protocol

export const HTTP_PORT = __IS_DEV__ ? '3000' : new URL(ORIGIN_URL).port
export const HTTPS_PORT = __IS_DEV__ ? '5556' : new URL(ORIGIN_URL).port

export const BASE_PORT = BASE_PROTOCOL === 'http:' ? HTTP_PORT : HTTPS_PORT

const DEV_URL = `${BASE_PROTOCOL}//${BASE_HOST}:${BASE_PORT}`

export const BASE_URL = __IS_DEV__
    ? DEV_URL
    : ORIGIN_URL

export const API_URL = `${BASE_URL}/api`
