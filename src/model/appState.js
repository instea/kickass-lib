// @flow
import { observable, action } from 'mobx'
import type { AppState } from './stateTypes'
import { urlToInitialState } from '../routing/urlUtils'
import { startFetching } from '../model/results'

const LOCAL_STORAGE_KEY = 'GITHUB_ACCESS_TOKEN'

const state: AppState = observable({
  libraryPath: 'https://github.com/instea/react-native-popup-menu',
  ghToken: getInitialToken(),
})

const initStateFromUrl = () => Object.assign(state, urlToInitialState())
const updateFromUrl = action(() => {
  initStateFromUrl()
  startFetching(state.libraryPath)
})

export const updateGHToken = action(token => {
  state.ghToken = token
  if (typeof window.localStorage === 'undefined') {
    return
  }
  window.localStorage.setItem(LOCAL_STORAGE_KEY, token)
})

export const getGHToken = () => state.ghToken

initStateFromUrl()
window.addEventListener('hashchange', updateFromUrl)

export default state

function getInitialToken() {
  if (typeof window.localStorage === 'undefined') {
    return
  }
  return window.localStorage.getItem(LOCAL_STORAGE_KEY)
}
