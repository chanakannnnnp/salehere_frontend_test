import * as React from 'react'
import './App.css'
// import custom styles
import './assets/scss/index.scss'

// router setup
import Routing from './routes'

function App() {
  return (
    <div className="App">
      <Routing />
    </div>
  )
}

export default App
