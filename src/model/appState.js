// @flow
import { observable, action } from 'mobx'
import type { AppState } from './stateTypes'
import { urlToInitialState } from '../routing/urlUtils'

const state: AppState = observable({
  libraryPath: 'https://github.com/instea/react-native-popup-menu',
})

const updateFromUrl = action(() => {
  Object.assign(state, urlToInitialState())
})
updateFromUrl()
window.addEventListener('hashchange', updateFromUrl)

export default state
