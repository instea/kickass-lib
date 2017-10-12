import React, { Component } from 'react'
import { observer } from 'mobx-react'

import { stateToUrl } from '../routing/urlUtils'
import { startFetching } from '../model/results'
import type { AppState } from '../model/stateTypes'

type Props = {
  appState: AppState
}
type State = {}

class CompareButton extends Component<Props, State> {
  render() {
    return <button onClick={this.updateUrl}>Compare</button>
  }

  updateUrl = () => {
    const { appState } = this.props
    window.history.pushState({}, '', stateToUrl(appState))
    startFetching(appState.libraryPath)
  }
}

export default observer(CompareButton)
