// @flow
import packageJsonPlugin from './plugins/packageJsonFetcher/packageJsonFetcher'
import githubRepoStatsFetcher from './plugins/githubRepoStatsFetcher/githubRepoStatsFetcher'

export const fetcherPlugins = [packageJsonPlugin, githubRepoStatsFetcher]

export const criteriaPlugins = []
