import React, { Component } from 'react'
import './App.css'

import GithubAuth from './api/GithubAuth'
import Results from './results/Results'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Kickass library analyser</h1>
        </header>
        <GithubAuth>
          <p className="App-intro">
            <Results />
          </p>
        </GithubAuth>
      </div>
    )
  }
}

export default App
