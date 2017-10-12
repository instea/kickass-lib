// @flow
import React, { Component } from 'react'
import { observer } from 'mobx-react'

import { startFetching } from '../model/results'
import appState from '../model/appState'
import { SimpleEngineContext, evaluate } from '../engine/Engine'
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
    console.log('Rendering results')
    const ctx = new SimpleEngineContext(this.props.ctx)
    const rating = evaluate(ctx, criteriaPlugins)
    return <div>Rating: {rating}</div>
  }
}

export default observer(Results)
