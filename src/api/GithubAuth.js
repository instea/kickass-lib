// @flow
import React, { Component } from 'react'
import Url from 'domurl'

import type { AppState } from '../model/stateTypes'
import { stateToHash, absoluteUrl } from '../routing/urlUtils'

import { instance as githubApi } from './Github'

type Props = {
  appState: AppState
}
type State = {}

const extractAndRemoveCodeFromUrl = (state: AppState) => {
  const url = new Url()
  const code = url.query.code
  if (code) {
    window.history.pushState({}, '', absoluteUrl(stateToHash(state)))
  }
  return code
}

// No need to observe, since state is used internally and not in markup
export default class GithubAuth extends Component<Props, State> {
  render() {
    const { appState } = this.props
    if (!githubApi.isReady()) {
      const code = extractAndRemoveCodeFromUrl(appState)
      if (code) {
        githubApi
          .retrieveAccessToken(code, absoluteUrl(stateToHash(appState)))
          .then(() => this.forceUpdate())
        return <span>Obtaining authorization...</span>
      }
      return <button onClick={githubApi.tryToInit}>Authorize on GitHub</button>
    } else {
      return null
    }
  }
}
