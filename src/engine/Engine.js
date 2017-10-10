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
    const canExecute = plugin => {
      if (!plugin.requiredKeys) return true
      return plugin.requiredKeys.every(key => this.ctx.get(key) !== undefined)
    }
    const self = this
    function tick(plugins) {
      return new Promise(resolve => {
        const toExecute = plugins.filter(canExecute)
        if (!toExecute.length) {
          // no change => nothing to execute in next tick
          return resolve()
        }
        const rest = plugins.filter(p => !canExecute(p))
        Promise.all(toExecute.map(p => p.fetch(self.ctx)))
          .then(() => tick(rest))
          .then(resolve)
      })
    }
    return tick(fetchPlugins)
  }
}
