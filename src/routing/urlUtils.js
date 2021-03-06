// @flow

import type { AppState } from '../model/stateTypes'

export function urlToInitialState(): ?{ libraryPath: string } {
  const hash = window.location.hash
  if (!hash) {
    return undefined
  }

  const match = hash.match(/#\/evaluate\/([^/]+)/)
  if (!match) {
    return
  }

  return {
    libraryPath: decodeURIComponent(match[1]),
  }
}

export function stateToHash(state: AppState): string {
  return `${libPathToHash(state.libraryPath)}`
}

export function libPathToHash(url: string): string {
  return `#/evaluate/${encodeURIComponent(url)}`
}

export function absoluteUrl(hash: string): string {
  return window.location.origin + window.location.pathname + hash
}
