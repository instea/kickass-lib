// @flow
import type { FetcherPlugin, EngineContext } from './types'

export default class Engine {
  ctx: EngineContext

  constructor() {
    const map = {}
    this.ctx = {
      get: key => map[key],
      set: (key, val) => {
        map[key] = val
      },
    }
  }

  run(fetchPlugins: [FetcherPlugin]): Promise<void> {
    return Promise.all(fetchPlugins.map(p => p.fetch(this.ctx))).then(
      results => undefined
    )
  }
}
