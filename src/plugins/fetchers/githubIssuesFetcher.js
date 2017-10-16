// @flow
import { instance, templateToUrl } from '../../api/Github'

import type { FetcherPlugin } from '../../engine/types'
import {
  CK_GH_REPO_STATS,
  CK_GH_LAST_ISSUES,
  CK_TOTAL_ISSUES_COUNT,
} from '../ContextKeys'

function fetchIssues(ctx) {
  const stats = ctx.get(CK_GH_REPO_STATS)
  const url = templateToUrl(stats.issues_url) + '?state=all'
  return instance.callAPI(url).then(issues => {
    ctx.set(CK_GH_LAST_ISSUES, issues)
    const latest = issues.length > 0 && issues[0]
    // just "estimate" issue count from latest issue number
    ctx.set(CK_TOTAL_ISSUES_COUNT, latest ? latest.number : 0)
  })
}

const plugin: FetcherPlugin = {
  fetch: fetchIssues,
  requiredKeys: [CK_GH_REPO_STATS],
}

export default plugin
