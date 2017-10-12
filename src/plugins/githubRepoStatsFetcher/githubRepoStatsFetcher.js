// @flow
import request from 'superagent'

import type { FetcherPlugin } from '../../engine/types'
import {
  CK_GH_NAME,
  CK_GH_REPO_STATS,
  CK_GH_NUM_STARS,
  CK_GH_OPEN_ISSUES,
  CK_GH_CREATED_AT,
  CK_GH_UPDATED_AT,
  CK_GH_PUSHED_AT,
} from '../ContextKeys'

function fetch(ctx) {
  const id = ctx.get(CK_GH_NAME)
  const url = makeRepoStatsRawUrl(id)
  return request.get(url).then(res => {
    const stats = res.body
    ctx.set(CK_GH_REPO_STATS, stats)
    ctx.set(CK_GH_NUM_STARS, stats.stargazers_count)
    ctx.set(CK_GH_OPEN_ISSUES, stats.open_issues)
    ctx.set(CK_GH_CREATED_AT, new Date(stats.created_at))
    ctx.set(CK_GH_UPDATED_AT, new Date(stats.updated_at))
    ctx.set(CK_GH_PUSHED_AT, new Date(stats.pushed_at))
  })
}

function makeRepoStatsRawUrl(id) {
  return `https://api.github.com/repos/${id}`
}

const plugin: FetcherPlugin = {
  fetch,
  requiredKeys: [CK_GH_NAME],
}

export default plugin
