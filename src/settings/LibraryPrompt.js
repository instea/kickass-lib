// @flow
import React from 'react'

import { observer } from 'mobx-react'

import type { AppState } from '../model/stateTypes'

type Props = {
  appState: AppState
}
type State = {}

class LibraryPrompt extends React.Component<Props, State> {
  render() {
    return <div>URL: {this.props.appState.libraryPath} </div>
  }
}

export default observer(LibraryPrompt)
