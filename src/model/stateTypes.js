// @flow
import type { ContextKey } from '../engine/types'

export type AppState = {
  libraryPath: string
}

export type ResultsState = {
  ctx: { [ContextKey]: any }
}
