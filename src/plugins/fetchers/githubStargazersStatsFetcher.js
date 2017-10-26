// @flow
import moment from 'moment'

import { instance as githubApi } from '../../api/Github'

import type { FetcherPlugin } from '../../engine/types'
import { CK_GH_REPO_STATS, CK_GH_PERIOD_LAST_30_STARS } from '../ContextKeys'

function parseLinks(link) {
  const links = {}
  const _links = link.split(/\s*,\s*/g)
  _links.forEach(l => {
    const parts = l.match(/<([^>]+)>; rel="([^\\)]+)"/)
    if (parts) {
      links[parts[2]] = parts[1]
    }
  })
  return links
}

async function fetch(ctx) {
  const stats = ctx.get(CK_GH_REPO_STATS)

  const urlFirst = stats.stargazers_url
  let url = await githubApi
    .callRawAPI(urlFirst)
    .then(({ headers: { link } }) => {
      const links = parseLinks(link)
      return links.last
    })

  let numFromEnd = 0
  while (url) {
    try {
      const { body: stars, headers: { link } } = await githubApi.callRawAPI(
        url,
        req => req.accept('application/vnd.github.v3.star+json')
      )
      numFromEnd += stars.length

      if (numFromEnd < 30) {
        const links = parseLinks(link)
        url = links.prev
      } else {
        url = undefined
        const the30thEntry = stars[numFromEnd - 30]
        const periodOfLast30Stars = moment(the30thEntry.starred_at)
        const diff = moment.duration(moment().diff(periodOfLast30Stars))
        ctx.set(CK_GH_PERIOD_LAST_30_STARS, diff)
      }
    } catch (e) {
      // Usually due to Github's pagination limitation, but that means there
      // are lot of stars and we will artificially set it to a very low value
      ctx.set(CK_GH_PERIOD_LAST_30_STARS, moment.duration(0))
      url = undefined
    }
  }
}

const plugin: FetcherPlugin = {
  fetch,
  requiredKeys: [CK_GH_REPO_STATS],
}

export default plugin
