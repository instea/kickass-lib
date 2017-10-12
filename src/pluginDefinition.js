// @flow
import packageJsonPlugin from './plugins/fetchers/packageJsonFetcher'
import githubRepoStatsFetcher from './plugins/fetchers/githubRepoStatsFetcher'

export const fetcherPlugins = [packageJsonPlugin, githubRepoStatsFetcher]

export const criteriaPlugins = []
