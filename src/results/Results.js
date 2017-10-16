// @flow
import React, { Component } from 'react'
import { observer } from 'mobx-react'

import { startFetching, ObservableContext } from '../model/results'
import appState from '../model/appState'
import { evaluate, aggregate } from '../engine/Engine'
import { criteriaPlugins } from '../pluginDefinition'

type Props = {
  ctx: Map<string, any>
}

class Results extends Component<Props> {
  componentDidMount() {
    if (appState.libraryPath) {
      startFetching(appState.libraryPath)
    }
  }

  render() {
    const ctx = new ObservableContext(this.props.ctx)
    const results = evaluate(ctx, criteriaPlugins)
    const rating = aggregate(results)
    return <div>Rating: {rating}</div>
  }
}

export default observer(Results)
