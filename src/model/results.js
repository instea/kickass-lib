// @flow
import { observable, action } from 'mobx'

import type { ResultsState } from './stateTypes'
import type { EngineContext } from '../engine/types'
import { fetcherPlugins } from '../pluginDefinition'
import { CK_GH_URL, CK_GH_NAME } from '../plugins/ContextKeys'
import Engine from '../engine/Engine'

const state: ResultsState = observable({
  ctx: {},
})

function extractName(url) {
  return url.replace('https://github.com/', '')
}

class ObservableContext implements EngineContext {
  get(key) {
    return state.ctx[key]
  }

  set = action((key, val) => {
    state.ctx[key] = val
  });
}

function _startFetching(url: string) {
  state.ctx = {}
  const engine = new Engine(new ObservableContext())
  console.log('Starting evalutation of ', url)
  engine.ctx.set(CK_GH_URL, url)
  engine.ctx.set(CK_GH_NAME, extractName(url))
  engine.run(fetcherPlugins).then(() => {
    console.log('done', state.ctx)
  })
}

export const startFetching = action(_startFetching)
export default state
