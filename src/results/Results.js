// @flow
import React, { Component } from 'react'
import { observer } from 'mobx-react'

import {
  startFetching,
  setPluginDetail,
  ObservableContext,
} from '../model/results'
import type { AppState, ResultsState } from '../model/stateTypes'
import { evaluate, aggregate } from '../engine/Engine'
import { criteriaPlugins } from '../pluginDefinition'
import { formatNumber } from './formatting'

type Props = {
  results: ResultsState,
  appState: AppState
}

class Results extends Component<Props> {
  componentDidMount() {
    const { appState } = this.props
    if (appState.libraryPath && appState.ghToken) {
      startFetching(appState.libraryPath)
    }
  }

  render() {
    const { results } = this.props
    const ctx = new ObservableContext(results.ctx)
    const partial = evaluate(ctx, criteriaPlugins)
    const rating = aggregate(partial)
    const selected = results.selectedPlugin
    return (
      <div>
        <h2>Rating: {formatNumber(rating)}</h2>
        {results.inProgress && 'inProgress'}
        <table className="table">
          <thead className="thead-inverse">
            <tr>
              <th>Criteria name</th>
              <th>Partial rating</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            {partial.map(r => (
              <ResultRow
                selected={r.plugin.name === selected}
                key={r.plugin.name}
                ctx={ctx}
                result={r}
              />
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

function ResultRow({ selected, result, ctx }) {
  const r = result
  // This is to allow multiline strings to be used for descriptions
  // Otherwise new lines and tabs would be preserved in the title attribute
  const description = r.plugin.description.replace(/\s+/g, ' ')
  const brief = (
    <tr key="brief">
      <td>
        {r.plugin.name}{' '}
        <button onClick={() => setPluginDetail(r.plugin.name)}>
          <i
            className="fa fa-info-circle"
            aria-hidden="true"
            title={description}
          />
        </button>
      </td>
      <td>{formatNumber(r.rating)}</td>
      <td>{r.plugin.weight}</td>
    </tr>
  )
  if (selected) {
    const Detail = r.plugin.detailComponent
    return [
      brief,
      <tr key="detail">
        <td colSpan="3">
          {r.plugin.description}
          {Detail && <Detail ctx={ctx} />}
        </td>
      </tr>,
    ]
  }
  return brief
}

export default observer(Results)
