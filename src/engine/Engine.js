// @flow
import type {
  Plugin,
  FetcherPlugin,
  EngineContext,
  CriteriaPlugin,
  ContextKey,
  Percentage,
} from './types'

type ObjectMap = { [string]: any }

export class SimpleEngineContext implements EngineContext {
  map: ObjectMap
  constructor(map: ?ObjectMap) {
    this.map = map || {}
  }

  set(key: ContextKey, val: any) {
    this.map[key] = val
  }

  get(key: ContextKey) {
    return this.map[key]
  }
}

export default class Engine {
  ctx: EngineContext

  constructor(initialContext: ?EngineContext) {
    this.ctx = initialContext || new SimpleEngineContext()
  }

  run(fetchPlugins: Array<FetcherPlugin>): Promise<void> {
    const tick = plugins => {
      return new Promise(resolve => {
        const toExecute = plugins.filter(this._canExecute)
        if (!toExecute.length) {
          // no change => nothing to execute in next tick
          return resolve()
        }
        const rest = plugins.filter(p => !this._canExecute(p))
        Promise.all(toExecute.map(p => p.fetch(this.ctx)))
          .then(() => tick(rest))
          .then(resolve)
      })
    }
    return tick(fetchPlugins)
  }

  _canExecute = (plugin: Plugin) => {
    if (!plugin.requiredKeys) return true
    return plugin.requiredKeys.every(key => this.ctx.get(key) !== undefined)
  }

  evaluate(criteriaPlugins: Array<CriteriaPlugin>): ?Percentage {
    const tmp = criteriaPlugins
      .filter(this._canExecute)
      .map(p => ({ rating: p.evaluate(this.ctx), weight: p.weight }))
      .filter(rw => rw.rating !== undefined)
    if (!tmp.length) {
      // no ratings yet
      return undefined
    }
    const sumWeight = tmp.reduce((sum, val) => sum + val.weight, 0)
    const sumRating = tmp.reduce(
      (rating, val) => rating + (val.rating || 0) * val.weight,
      0
    )
    return sumRating / sumWeight
  }
}
