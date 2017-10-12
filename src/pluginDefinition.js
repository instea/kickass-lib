// @flow
import packageJsonPlugin from './plugins/fetchers/packageJsonFetcher'
import githubRepoStatsFetcher from './plugins/fetchers/githubRepoStatsFetcher'

import githubStarsCriteria from './plugins/criteria/githubStarsCriteria'

export const fetcherPlugins = [packageJsonPlugin, githubRepoStatsFetcher]

export const criteriaPlugins = [githubStarsCriteria]
