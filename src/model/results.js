// @flow
import { observable, action } from 'mobx'

import type { ResultsState } from './stateTypes'
import type { EngineContext, ContextKey } from '../engine/types'
import { fetcherPlugins } from '../pluginDefinition'
import { CK_GH_URL, CK_GH_NAME } from '../plugins/ContextKeys'
import Engine from '../engine/Engine'

const state: ResultsState = observable({
  ctx: observable(new Map()),
})

function extractName(url) {
  return url.replace('https://github.com/', '')
}

export class ObservableContext implements EngineContext {
  ctx: EngineContext

  constructor(ctx: EngineContext) {
    this.ctx = ctx
  }

  get(key: ContextKey) {
    return this.ctx.get(key)
  }

  set = action((key, val) => {
    this.ctx.set(key, val)
  });
}

function _startFetching(url: string) {
  state.ctx.clear()
  const engine = new Engine(new ObservableContext(state.ctx))
  console.log('Starting evalutation of ', url)
  engine.ctx.set(CK_GH_URL, url)
  engine.ctx.set(CK_GH_NAME, extractName(url))
  engine.run(fetcherPlugins).then(() => {
    console.log('done', state.ctx)
  })
}

export const startFetching = action(_startFetching)
export default state
