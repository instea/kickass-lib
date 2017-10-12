// @flow
import React, { Component } from 'react'
import './App.css'

import GithubAuth from './api/GithubAuth'
import { instance as githubApi } from './api/Github'
import Results from './results/Results'
import CompareButton from './results/CompareButton'
import LibraryPrompt from './settings/LibraryPrompt'

import appState from './model/appState'
import results from './model/results'

class App extends Component<{}, {}> {
  render() {
    return (
      <div className="App container">
        <header className="App-header row">
          <h1 className="App-title">Kickass library analyser</h1>
        </header>
        <LibraryPrompt appState={appState} />
        {githubApi.isReady() && <CompareButton appState={appState} />}
        {!githubApi.isReady() && <GithubAuth appState={appState} />}
        {githubApi.isReady() && (
          <Results appState={appState} ctx={results.ctx} />
        )}
      </div>
    )
  }
}

export default App
