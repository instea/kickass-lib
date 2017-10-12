// @flow

import superagent from 'superagent'

import config from '../config'
import { ApiAdapter } from './apiTypes'

const LOCAL_STORAGE_KEY = 'GITHUB_ACCESS_TOKEN'
const AUTHORIZE_URL = 'https://github.com/login/oauth/authorize'
const getAuthorizeUrl = clientId =>
  `${AUTHORIZE_URL}?client_id=${clientId}&redirect_uri=${window.location.toString()}`
const ACCESS_TOKEN_URL = '/access_token'

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

  retrieveAccessToken(code: String): Promise<String> {
    return superagent
      .post(ACCESS_TOKEN_URL)
      .send({
        clientId: config.GITHUB_CLIENT_ID,
        code: code,
      })
      .then(({ body: resp }) => {
        if (!resp || resp.status !== 'success') {
          throw new Error(resp.message)
        }
        this.saveAccessToken(resp.accessToken)
        return resp.accessToken
      })
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
