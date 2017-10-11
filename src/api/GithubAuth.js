import React from 'react'
import Url from 'domurl'

import { instance as githubApi } from './Github'

const extractCodeFromUrl = () => new Url().query.code

const GithubAuth = ({ children }) => {
  if (!githubApi.isReady()) {
    const code = extractCodeFromUrl()
    if (code) {
      githubApi.retrieveAccessToken(code)
      return <span>Obtaining authorization...</span>
    }
    return <button onClick={githubApi.tryToInit}>Authorize on GitHub</button>
  } else {
    return <div>{children}</div>
  }
}

export default GithubAuth
