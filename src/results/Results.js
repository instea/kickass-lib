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
    return (
      <div>
        <h2>Rating: {rating}</h2>
        <table className="table">
          <thead className="thead-inverse">
            <tr>
              <th>Criteria name</th>
              <th>Partial rating</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            {results.map(r => (
              <tr key={r.plugin.name}>
                <td>
                  {r.plugin.name}{' '}
                  <i
                    className="fa fa-info-circle"
                    aria-hidden="true"
                    title={r.plugin.description}
                  />
                </td>
                <td>{r.rating}</td>
                <td>{r.plugin.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default observer(Results)
