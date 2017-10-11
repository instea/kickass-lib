// @flow

import superagent from 'superagent'

import config from '../config'
import { ApiAdapter } from './apiTypes'

const LOCAL_STORAGE_KEY = 'GITHUB_ACCESS_TOKEN'
const AUTHORIZE_URL = 'https://github.com/login/oauth/authorize'
const getAuthorizeUrl = clientId => `${AUTHORIZE_URL}?client_id=${clientId}`
const ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token'

const objToQueryString = obj =>
  Object.keys(obj)
    .map(key => `${key}=${obj[key]}`)
    .join('&')

export default class Github implements ApiAdapter {
  isReady() {
    return !!localStorage.getItem(LOCAL_STORAGE_KEY)
  }

  tryToInit() {
    window.location.assign(getAuthorizeUrl(config.GITHUB_CLIENT_ID))
  }

  saveAccessToken(accessToken: string): void {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, accessToken)
  }

  retrieveAccessToken(code: String): void {
    superagent
      .post(ACCESS_TOKEN_URL)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Accept', 'application/json')
      .send(
        objToQueryString({
          client_id: config.GITHUB_CLIENT_ID,
          client_secret: config.GITHUB_CLIENT_SECRET,
          code: code,
        })
      )
      .then(response => this.saveAccessToken(response.access_token))
  }

  callAPI(url: String): Promise<Object> {
    let request = superagent.get(url)
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY)
    request = accessToken
      ? request.set('Authorization', `token ${accessToken}`)
      : request
    return request
  }
}

export const instance = new Github()
