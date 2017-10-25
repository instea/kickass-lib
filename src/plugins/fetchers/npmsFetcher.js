// @flow
import superagent from 'superagent'
import type { FetcherPlugin } from '../../engine/types'
import {
  CK_NPM_NAME,
  CK_NPMS_DATA,
  CK_NPM_DOWNLOADS_WEEKLY,
  CK_NPM_DOWNLOADS_MONTHLY,
  CK_NPM_DOWNLOADS_YEARLY,
} from '../ContextKeys'

function fetch(ctx) {
  const name = ctx.get(CK_NPM_NAME)
  const url = makeRawUrl(name)
  superagent.get(url).then(res => {
    const data = res.body && res.body
    console.log('npms data', data)
    ctx.set(CK_NPMS_DATA, data)
    const npmDownloads = data.collected.npm.downloads
    const [, weekly, monthly, , , yearly] = npmDownloads
    ctx.set(CK_NPM_DOWNLOADS_WEEKLY, weekly.count)
    ctx.set(CK_NPM_DOWNLOADS_MONTHLY, monthly.count)
    ctx.set(CK_NPM_DOWNLOADS_YEARLY, yearly.count)
  })
}

function makeRawUrl(name) {
  return `https://api.npms.io/v2/package/${name}`
}

const plugin: FetcherPlugin = {
  fetch,
  requiredKeys: [CK_NPM_NAME],
}

export default plugin
