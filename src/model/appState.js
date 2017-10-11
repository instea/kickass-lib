// @flow
import { observable } from 'mobx'
import type { AppState } from './stateTypes'

const state: AppState = observable({
  libraryPath: 'http://',
})

export default state
