// @flow
import request from 'superagent'

import type { FetcherPlugin } from '../../engine/types'
import { CK_GH_NAME, CK_NPM_NAME, CK_NPM_PACKAGE } from '../ContextKeys'

function fetch(ctx) {
  const id = ctx.get(CK_GH_NAME)
  return fetchFile(ctx, id, 'package.json')
}

function fetchFile(ctx, id, path) {
  const url = makePackageRawUrl(id, path)
  return request.get(url).then(res => {
    const pkg = JSON.parse(res.text)
    ctx.set(CK_NPM_PACKAGE, pkg)
    ctx.set(CK_NPM_NAME, pkg.name)
  })
}

function makePackageRawUrl(id, path) {
  return `https://raw.githubusercontent.com/${id}/master/${path}`
}

const plugin: FetcherPlugin = {
  fetch,
  requiredKeys: [CK_GH_NAME],
}

export default plugin
