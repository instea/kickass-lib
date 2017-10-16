// @flow

import superagent from 'superagent'

import config from '../config'
import type { ApiAdapter, StringPojo } from './apiTypes'

const LOCAL_STORAGE_KEY = 'GITHUB_ACCESS_TOKEN'
const AUTHORIZE_URL = 'https://github.com/login/oauth/authorize'
const getAuthorizeUrl = clientId =>
  `${AUTHORIZE_URL}?client_id=${clientId}&redirect_uri=${window.location.toString()}`
const ACCESS_TOKEN_URL = '/access_token'

function getToken() {
  if (typeof window.localStorage === 'undefined') {
    return
  }
  return window.localStorage.getItem(LOCAL_STORAGE_KEY)
}

export default class Github implements ApiAdapter {
  isReady() {
    return !!getToken()
  }

  tryToInit() {
    window.location.assign(getAuthorizeUrl(config.GITHUB_CLIENT_ID))
  }

  saveAccessToken(accessToken: string): void {
    if (typeof window.localStorage === 'undefined') {
      return
    }
    window.localStorage.setItem(LOCAL_STORAGE_KEY, accessToken)
  }

  retrieveAccessToken(code: string, redirectUri: ?string): Promise<string> {
    return superagent
      .post(ACCESS_TOKEN_URL)
      .send({
        clientId: config.GITHUB_CLIENT_ID,
        code: code,
        redirectUri,
      })
      .then(({ body: resp }) => {
        if (!resp || resp.status !== 'success') {
          throw new Error(resp.message)
        }
        this.saveAccessToken(resp.accessToken)
        return resp.accessToken
      })
  }

  callAPI(url: string): Promise<Object> {
    let request = superagent.get(url)
    const accessToken = getToken()
    request = accessToken
      ? request.set('Authorization', `token ${accessToken}`)
      : request
    return request.then(res => res.body)
  }
}

export function templateToUrl(urlTemplate: string, params: ?StringPojo) {
  return urlTemplate.replace(/{.+}/g, substr => {
    console.log('found', substr)
    // TODO implement also actual replacement (not needed now :))
    return ''
  })
}

export const instance = new Github()
