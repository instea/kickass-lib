import React, { Component } from 'react'
import Url from 'domurl'

import { instance as githubApi } from './Github'

const extractAndRemoveCodeFromUrl = () => {
  const url = new Url()
  const code = url.query.code
  delete url.query.code
  if (code) {
    url.protocol = ''
    url.host = ''
    url.port = ''
    window.history.pushState({}, '', url.toString())
  }
  return code
}

export default class GithubAuth extends Component {
  render() {
    const { children } = this.props
    if (!githubApi.isReady()) {
      const code = extractAndRemoveCodeFromUrl()
      if (code) {
        githubApi.retrieveAccessToken(code).then(() => this.forceUpdate())
        return <span>Obtaining authorization...</span>
      }
      return <button onClick={githubApi.tryToInit}>Authorize on GitHub</button>
    } else {
      return <div>{children}</div>
    }
  }
}
