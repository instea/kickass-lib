// @flow
import type { FetcherPlugin } from './types'

export default class Engine {
  run(fetchPlugins: [FetcherPlugin]): any {
    return Promise.all(fetchPlugins.map(p => p.fetch())).then(
      results => results[0]
    )
  }
}
