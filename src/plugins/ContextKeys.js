// @flow
// list of "public" context keys used by plugins

// generic keys
/* count of all open issues (number) */
export const CK_OPEN_ISSUES_COUNT = 'OPEN_ISSUES_COUNT'
/* total issues count (number) */
export const CK_TOTAL_ISSUES_COUNT = 'CK_TOTAL_ISSUES_COUNT'

// npm specific keys
/* parsed content of projct package.json (json) */
export const CK_NPM_PACKAGE = 'NPM_package.json'
/* URL to the npm project page (string) */
export const CK_NPM_URL = 'NPM_URL'
/* npm name (string) */
export const CK_NPM_NAME = 'NPM_NAME'
/* download counts (number) */
export const CK_NPM_DOWNLOADS_WEEKLY = 'NPM_WEEKLY_DOWNLOADS'
export const CK_NPM_DOWNLOADS_MONTHLY = 'NPM_MONTHLY_DOWNLOADS'
export const CK_NPM_DOWNLOADS_YEARLY = 'NPM_YEARLY_DOWNLOADS'

// github specific keys
/* URL to the GH repository (string) */
export const CK_GH_URL = 'GITHUB_URL'
/* repo name in form `author/name` (string) */
export const CK_GH_NAME = 'GITHUB_NAME'
export const CK_GH_REPO_STATS = 'GITHUB_REPO_STATS'
export const CK_GH_NUM_STARS = 'GITHUB_NUM_STARS'
export const CK_GH_CREATED_AT = 'GITHUB_CREATED_AT'
export const CK_GH_UPDATED_AT = 'GITHUB_UPDATED_AT'
export const CK_GH_PUSHED_AT = 'GITHUB_PUSHED_AT'
/* last issues as returned by `/issues?state=all (json) */
export const CK_GH_LAST_ISSUES = 'GITHUB_LAST_ISSUES'
/* comments for last issues (array<{issue, comments}>) */
export const CK_GH_COMMENTS_PER_ISSUES = 'GITHUB_ISSUES_COMMENTS'

// npms.io specific keys
export const CK_NPMS_DATA = 'NPMS_DATA'
