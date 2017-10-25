// @flow
import map from 'promise-map'

import { instance } from '../../api/Github'
import type { FetcherPlugin } from '../../engine/types'
import { CK_GH_LAST_ISSUES, CK_GH_COMMENTS_PER_ISSUES } from '../ContextKeys'

function fetchIssueComments(ctx) {
  const issues = ctx.get(CK_GH_LAST_ISSUES).toJS()
  return map(fetchComments)(issues).then(commentsPerIssues =>
    ctx.set(CK_GH_COMMENTS_PER_ISSUES, commentsPerIssues)
  )
}

function fetchComments(issue) {
  return instance
    .callAPI(issue.comments_url)
    .then(comments => ({ issue, comments }))
}

const plugin: FetcherPlugin = {
  fetch: fetchIssueComments,
  requiredKeys: [CK_GH_LAST_ISSUES],
}

export default plugin
