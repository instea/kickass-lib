// @flow
import { observable, action } from 'mobx'
import type { AppState } from './stateTypes'
import { urlToInitialState } from '../routing/urlUtils'
import { startFetching } from '../model/results'

const state: AppState = observable({
  libraryPath: 'https://github.com/instea/react-native-popup-menu',
})

const initStateFromUrl = () => Object.assign(state, urlToInitialState())
const updateFromUrl = action(() => {
  initStateFromUrl()
  startFetching(state.libraryPath)
})

initStateFromUrl()
window.addEventListener('hashchange', updateFromUrl)

export default state
