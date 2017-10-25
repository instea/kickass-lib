// @flow
import packageJsonPlugin from './plugins/fetchers/packageJsonFetcher'
import githubRepoStatsFetcher from './plugins/fetchers/githubRepoStatsFetcher'
import githubIssuesFetcher from './plugins/fetchers/githubIssuesFetcher'
import issueCommentsFetcher from './plugins/fetchers/githubIssueCommentsFetcher'
import npmsFetcher from './plugins/fetchers/npmsFetcher'

import githubStarsCriteria from './plugins/criteria/githubStarsCriteria'
import openIssuesRatioCriteria from './plugins/criteria/openIssuesRatioCriteria'
import issueResponseTimeCriteria from './plugins/criteria/issueResponseTimeCriteria'
import npmDownloadsCriteria from './plugins/criteria/npmDownloadsCriteria'
import downloadsTrendCriteria from './plugins/criteria/downloadsTrendCriteria'
import activeContributorsCriteria from './plugins/criteria/activeContributorsCriteria'

export const fetcherPlugins = [
  packageJsonPlugin,
  githubRepoStatsFetcher,
  githubIssuesFetcher,
  issueCommentsFetcher,
  npmsFetcher,
]

export const criteriaPlugins = [
  githubStarsCriteria,
  openIssuesRatioCriteria,
  issueResponseTimeCriteria,
  npmDownloadsCriteria,
  downloadsTrendCriteria,
  activeContributorsCriteria,
]
