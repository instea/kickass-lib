// @flow
import packageJsonPlugin from './plugins/fetchers/packageJsonFetcher'
import githubRepoStatsFetcher from './plugins/fetchers/githubRepoStatsFetcher'
import githubIssuesFetcher from './plugins/fetchers/githubIssuesFetcher'
import issueCommentsFetcher from './plugins/fetchers/githubIssueCommentsFetcher'
import githubStargazersStatsFetcher from './plugins/fetchers/githubStargazersStatsFetcher'
import npmsFetcher from './plugins/fetchers/npmsFetcher'

import githubStarsCriteria from './plugins/criteria/githubStarsCriteria'
import openIssuesRatioCriteria from './plugins/criteria/openIssuesRatioCriteria'
import issueResponseTimeCriteria from './plugins/criteria/issueResponseTimeCriteria'
import npmDownloadsCriteria from './plugins/criteria/npmDownloadsCriteria'
import downloadsTrendCriteria from './plugins/criteria/downloadsTrendCriteria'
import activeContributorsCriteria from './plugins/criteria/activeContributorsCriteria'
import starsTrendCriteria from './plugins/criteria/starsTrendCriteria'

export const fetcherPlugins = [
  packageJsonPlugin,
  githubRepoStatsFetcher,
  githubIssuesFetcher,
  issueCommentsFetcher,
  githubStargazersStatsFetcher,
  npmsFetcher,
]

export const criteriaPlugins = [
  githubStarsCriteria,
  openIssuesRatioCriteria,
  issueResponseTimeCriteria,
  npmDownloadsCriteria,
  downloadsTrendCriteria,
  activeContributorsCriteria,
  starsTrendCriteria,
]
