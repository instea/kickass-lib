// @flow
import { observable, autorun } from 'mobx'

import type { ResultsState } from './stateTypes'
import { fetcherPlugins } from '../pluginDefinition'
import { CK_GH_URL, CK_GH_NAME } from '../plugins/ContextKeys'
import Engine from '../engine/Engine'

const state: ResultsState = observable({
  githubUrl: undefined,
  ctx: {},
})

function extractName(url) {
  return url.replace('https://github.com/', '')
}

autorun(() => {
  const engine = new Engine(state.ctx)
  const url = state.githubUrl
  if (url) {
    console.log('Starting evalutation of ', url)
    engine.ctx.set(CK_GH_URL, url)
    engine.ctx.set(CK_GH_NAME, extractName(url))
    engine.run(fetcherPlugins).then(() => {
      console.log('done', state.ctx)
    })
  }
})

export default state
