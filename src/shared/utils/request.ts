import { env } from '../../config/config'
import { BASE_CONFIG } from '../../config/consts'
import merge from 'ts-deepmerge'

type ConfigKey = 'dataFormat' | 'language' | 'timezone'
type Config = { [key in ConfigKey]?: unknown }
type Filters = { [key: string]: string | number }
type Params = {
  config?: Config
  filters?: Filters
}

const prepareConfig = (config?: Config) => {
  if (!config) return ''
  return Object.entries(config).reduce((acc, [key, val], index) => {
    const separator = index === 0 ? '' : '&'
    return `${acc}${separator}${key}=${JSON.stringify(val)}`
  }, '')
}

const prepareFilters = (filters?: Filters) => {
  if (!filters) return ''
  return Object.entries(filters).reduce((acc, [key, val]) => {
    return `${acc}&filter[${key}]=${val}`
  }, '')
}

const prepareParams = (params?: Params) => {
  const mergedConf = merge(params?.config || {}, BASE_CONFIG)
  const config = prepareConfig(mergedConf)
  const filters = prepareFilters(params?.filters)

  return config + filters
}

export const request = async <T>(route: string, params?: Params): Promise<T> => {
  const queryParams = prepareParams(params)
  console.log('queryParams: ', queryParams)

  const response = await fetch(
    `${env.API_URL}${route}?${queryParams}&companyUuid=${env.API_KEY}`,
  )

  const { data } = await response.json()

  return data as T
}
