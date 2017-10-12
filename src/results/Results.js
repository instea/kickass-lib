// @flow
import React, { Component } from 'react'
import { observer } from 'mobx-react'

import type { ResultsState } from '../model/stateTypes'
import { startFetching } from '../model/results'
import appState from '../model/appState'

type Props = {
  results: ResultsState
}

class Results extends Component<Props> {
  componentDidMount() {
    if (appState.libraryPath) {
      startFetching(appState.libraryPath)
    }
  }

  render() {
    return <div>Results</div>
  }
}

export default observer(Results)
