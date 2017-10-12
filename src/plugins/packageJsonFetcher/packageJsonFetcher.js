// @flow
import request from 'superagent'

import type { FetcherPlugin } from '../../engine/types'
import { CK_GH_URL } from '../ContextKeys'

function fetch(ctx) {
  const base = ctx.get(CK_GH_URL)
  const id = extractOrgName(base)
  const url = makePackageRawUrl(id)
  return request.get(url).then(res => {
    const pkg = JSON.parse(res.text)
    console.log('xx', pkg)
    ctx.set('package.json', pkg)
    ctx.set('npm-name', pkg.name)
  })
}

function extractOrgName(url) {
  return url.replace('https://github.com/', '')
}

function makePackageRawUrl(id) {
  return `https://raw.githubusercontent.com/${id}/master/package.json`
}

const plugin: FetcherPlugin = {
  fetch,
  requiredKeys: [CK_GH_URL],
}

export default plugin
