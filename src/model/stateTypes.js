// @flow
import type { ContextKey } from '../engine/types'

export type AppState = {
  libraryPath: string
}

export type ResultsState = {
  // staring point for evaluation - URL to github
  githubUrl: ?string,
  ctx: { [ContextKey]: any }
}
