// @flow
import React, { Component } from 'react'
import { observer } from 'mobx-react'

import { startFetching } from '../model/results'
import type { AppState } from '../model/stateTypes'

type Props = {
  appState: AppState
}
type State = {}

class CompareButton extends Component<Props, State> {
  render() {
    if (!this.props.appState.ghToken) {
      return null
    }
    return <button onClick={this.updateUrl}>Compare</button>
  }

  updateUrl = () => {
    const { appState } = this.props
    startFetching(appState.libraryPath)
  }
}

export default observer(CompareButton)
