// @flow
import superagent from 'superagent'
import type { FetcherPlugin } from '../../engine/types'
import { CK_NPM_NAME, CK_NPMS_DATA } from '../ContextKeys'

function fetch(ctx) {
  const name = ctx.get(CK_NPM_NAME)
  const url = makeRawUrl(name)
  superagent.get(url).then(res => {
    const data = res.body && res.body.collected
    console.log('npms data', data)
    ctx.set(CK_NPMS_DATA, data)
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
