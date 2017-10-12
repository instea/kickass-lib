// @flow

import URL from 'domurl'

import type { AppState } from '../model/stateTypes'

export function urlToInitialState(): ?AppState {
  const url = new URL()
  if (!url.hash) {
    return undefined
  }

  const match = url.hash.match(/\/evaluate\/([^/]+)/)
  if (!match) {
    return
  }

  return {
    libraryPath: decodeURIComponent(match[1]),
  }
}

export function stateToUrl(state: AppState): string {
  return `/#/evaluate/${encodeURIComponent(state.libraryPath)}`
}

export function absoluteUrl(url: string): string {
  return window.location.origin + url
}
