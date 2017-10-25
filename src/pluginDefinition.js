// @flow
import packageJsonPlugin from './plugins/fetchers/packageJsonFetcher'
import githubRepoStatsFetcher from './plugins/fetchers/githubRepoStatsFetcher'
import githubIssuesFetcher from './plugins/fetchers/githubIssuesFetcher'
import npmsFetcher from './plugins/fetchers/npmsFetcher'

import githubStarsCriteria from './plugins/criteria/githubStarsCriteria'
import openIssuesRatioCriteria from './plugins/criteria/openIssuesRatioCriteria'
import npmDownloadsCriteria from './plugins/criteria/npmDownloadsCriteria'
import downloadsTrendCriteria from './plugins/criteria/downloadsTrendCriteria'
import activeContributorsCriteria from './plugins/criteria/activeContributorsCriteria'

export const fetcherPlugins = [
  packageJsonPlugin,
  githubRepoStatsFetcher,
  githubIssuesFetcher,
  npmsFetcher,
]

export const criteriaPlugins = [
  githubStarsCriteria,
  openIssuesRatioCriteria,
  npmDownloadsCriteria,
  downloadsTrendCriteria,
  activeContributorsCriteria,
]
