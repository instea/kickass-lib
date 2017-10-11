// @flow
import { observable } from 'mobx'
import type { AppState } from './stateTypes'

const state: AppState = observable({
  libraryPath: 'https://github.com/instea/react-native-popup-menu',
})

export default state
