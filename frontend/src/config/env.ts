type AppEnv = 'development' | 'staging' | 'production'

export const ENV = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  appEnv: import.meta.env.VITE_APP_ENV as AppEnv,
  isDevelopment: import.meta.env.VITE_APP_ENV === 'development',
} as const
