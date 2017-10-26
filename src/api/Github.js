// @flow

import superagent from 'superagent'

import config from '../config'
import type { ApiAdapter, StringPojo } from './apiTypes'
import { updateGHToken, getGHToken } from '../model/appState'

type Req = superagent.SuperAgentRequest

const AUTHORIZE_URL = 'https://github.com/login/oauth/authorize'
const getAuthorizeUrl = clientId =>
  `${AUTHORIZE_URL}?client_id=${clientId}&redirect_uri=${window.location.toString()}`
const ACCESS_TOKEN_URL = config.authUrl + '/access_token'

export default class Github implements ApiAdapter {
  isReady() {
    return !!getGHToken()
  }

  tryToInit() {
    window.location.assign(getAuthorizeUrl(config.GITHUB_CLIENT_ID))
  }

  saveAccessToken(accessToken: string): void {
    updateGHToken(accessToken)
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

  callAPI(url: string, withRequest: ?(Req) => Req): Promise<Object> {
    return this.callRawAPI(url, withRequest).then(res => res.body)
  }

  callRawAPI(url: string, withRequest: ?(Req) => Req): Promise<Object> {
    let request = superagent.get(url)
    const accessToken = getGHToken()
    request = accessToken
      ? request.set('Authorization', `token ${accessToken}`)
      : request
    if (withRequest) {
      request = withRequest(request)
    }
    return request
  }
}

export function templateToUrl(urlTemplate: string, params: ?StringPojo) {
  return urlTemplate.replace(
    /\{([^}a-zA-Z0-9]*)([^}]+)\}/g,
    (whole, prefix, name) =>
      params && params[name] ? prefix + params[name] : ''
  )
}

export const instance = new Github()
