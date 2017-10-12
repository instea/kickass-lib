// @flow
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { action } from 'mobx'

import type { ResultsState } from '../model/stateTypes'
import appState from '../model/appState'

type Props = {
  results: ResultsState
}

class Results extends Component<Props> {
  componentDidMount() {
    action(() => (this.props.results.githubUrl = appState.libraryPath))()
  }

  render() {
    return <div>Results</div>
  }
}

export default observer(Results)
