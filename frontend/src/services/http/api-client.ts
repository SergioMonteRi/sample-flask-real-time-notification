import axios from 'axios'

import { ENV } from '@/config'
import { APP } from '@/constants'

export const apiClient = axios.create({
  baseURL: ENV.apiBaseUrl,
  timeout: APP.httpTimeoutMs,
  headers: { 'Content-Type': 'application/json' },
})
