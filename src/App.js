// @flow
import React, { Component } from 'react'
import DevTools from 'mobx-react-devtools'
import './App.css'

import GithubAuth from './api/GithubAuth'
import Results from './results/Results'
import CompareButton from './results/CompareButton'
import LibraryPrompt from './settings/LibraryPrompt'

import appState from './model/appState'
import results from './model/results'

class App extends Component<{}, {}> {
  render() {
    return (
      <div className="App container">
        <DevTools />
        <header className="App-header row">
          <h1 className="App-title">Kickass library analyser</h1>
        </header>
        <LibraryPrompt appState={appState} />
        <CompareButton appState={appState} />
        <GithubAuth appState={appState} />
        <Results appState={appState} results={results} />
      </div>
    )
  }
}

export default App
