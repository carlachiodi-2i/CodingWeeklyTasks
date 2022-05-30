import React, { useState } from 'react'
import './App.css';
import Tile from './Tile';
// import logo from './mk-logo.png'

function App() {
  let tiles = []
  const [names, setNames] = useState([])
  const [count, setCount] = useState(0)
  function submitName(e) {
    e.preventDefault()
    let newCount = count + 1
    let newNames = [...names, e.target[0].value]
    setNames(newNames)
    setCount(newCount)
  }
  for (let i = 1; i <= count; i++) {
    const tileStyle = {bottom: (8 + i*75).toString() + 'px'}
    tiles.push(<div className="tile" style={tileStyle} key={`tile-${i}`}>
        <Tile key={`tile-${i}`} name={names[i]} count={count} />
      </div>)
  }


  return (
    <div className="App">
      <div className="App-container">
        <div className="inputs">
          <form onSubmit={submitName} className="name-submit">
            <label>Enter a name</label>
            <input type="text" />
            <input type="submit" />
          </form>
          <button>Sort!</button>
          <button>Clear</button>
        </div>
        <div className="tiles">
          {tiles}
        </div>
      </div>
    </div>
  );
}

export default App;
