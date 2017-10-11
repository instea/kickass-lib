// @flow
import React from 'react'

import { observer } from 'mobx-react'
import { action } from 'mobx'

import type { AppState } from '../model/stateTypes'

type Props = {
  appState: AppState
}
type State = {}

class LibraryPrompt extends React.Component<Props, State> {
  render() {
    return (
      <form>
        <div className="form-group row">
          <label className="col-form-label col-sm-2" for="libPath">
            Github URL:
          </label>
          <input
            id="libPath"
            className="form-control col-sm-10"
            value={this.props.appState.libraryPath}
            onChange={this.onChange}
          />
        </div>
      </form>
    )
  }

  onChange = action(e => (this.props.appState.libraryPath = e.target.value))
}

export default observer(LibraryPrompt)
