// @flow
import packageJsonPlugin from './plugins/fetchers/packageJsonFetcher'
import githubRepoStatsFetcher from './plugins/fetchers/githubRepoStatsFetcher'
import githubIssuesFetcher from './plugins/fetchers/githubIssuesFetcher'

import githubStarsCriteria from './plugins/criteria/githubStarsCriteria'
import openIssuesRatioCriteria from './plugins/criteria/openIssuesRatioCriteria'

export const fetcherPlugins = [
  packageJsonPlugin,
  githubRepoStatsFetcher,
  githubIssuesFetcher,
]

export const criteriaPlugins = [githubStarsCriteria, openIssuesRatioCriteria]
