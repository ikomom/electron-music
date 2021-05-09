// 是否在electron环境下
export const IS_ELECTRON = process.env.IS_ELECTRON
// 是否在生产模式
export const IS_PRODUCTION = process.env.NODE_ENV === 'production'
// 是否在开发模式
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
