// @flow
import React, { Component } from 'react'
import './App.css'

import GithubAuth from './api/GithubAuth'
import Results from './results/Results'
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
        <GithubAuth>
          <Results results={results} />
        </GithubAuth>
      </div>
    )
  }
}

export default App
