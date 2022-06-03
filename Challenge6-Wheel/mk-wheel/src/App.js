import React, { useState } from 'react'
import './App.css';
import Tile from './Tile';
import characters from './imgs/characters/characters';


function App() {
  let charactersList = ['johnnyCage','noobSaibot','baraka', 'cyrax','sonyaBlade', 'raiden','rain', 'shangTsung',
  'kitana', 'kano', 'scorpio', 'subzero','hsmoke','reptile','jaxx','mileena',
  'sektor', 'lyuKang','jade','sheeva','kungLao','smoke', 'stryker',
  'nightwolf','sindel','ermac','subzero2', 'kabal',
  'goro',  'motaro',  'shaoKahn',  'kintaro']

  let maxNamesPerWidth = {
    '450': 36,
    '999': 34,
    '1000': 55 
  }

  function pileTiles (iterator, size) {
    let breakPoint 
    let row
    let leftIncrement

    if (size <= 450) {
      breakPoint = 12
      row = Math.ceil(iterator/breakPoint)
      leftIncrement = 100
      return {bottom: (-10 + (iterator-(breakPoint*(row-1)))*41).toString() + 'px', left: (-75 + leftIncrement*(row-1)).toString() + "px"}
    }
    else {
      breakPoint = 9
      row = Math.ceil(iterator/breakPoint)
      leftIncrement = 200
      return {bottom: (-30 + (iterator-(breakPoint*(row-1)))*75).toString() + 'px', left: (leftIncrement*(row-1)).toString() + "px"}
    }
  }

  function changesToWindowSize(situation, iterator) {
    let w = window.innerWidth
    let sizes = Object.keys(maxNamesPerWidth)
    
    switch (situation) {
      case 'styling':
        return pileTiles(iterator, w)
      default:
        //define maximum number of name tiles according to the window size
        if (w <= sizes[0]) {
          return maxNamesPerWidth[sizes[0]]
        } else if (w > sizes[0] && w <= sizes[1]) {
          return maxNamesPerWidth[sizes[1]]
        } else if (w >= sizes[2]) {
          return maxNamesPerWidth[sizes[2]]
        }
        break
    }
  }

  let tiles = []
  const [names, setNames] = useState([])
  const [count, setCount] = useState(0)

  function submitName(e) {
    e.preventDefault()
    let newCount = count + 1
    let newNames = [...names, e.target[0].value]
    setNames(newNames)
    setCount(newCount)

    // Disable Submit button when maximum amount names submitted
    if (newCount >= changesToWindowSize('', '')) {
      document.getElementById('submitName').disabled = true
    } else {
      document.getElementById('submitName').disabled = false
    }
  }
    
  for (let i = 1; i <= count; i++) {
    // Check window size to define the css increments
    let tileStyle = changesToWindowSize('styling', i)
  
    tiles.push(<div className="tile" style={tileStyle} key={`tile-${i}`}>
        <Tile key={`tile-${i}`} name={names[i-1]} count={count} character={(i <= charactersList.length) ? characters[charactersList[i-1]] : characters[charactersList[(i-charactersList.length)-1]]} />
      </div>)
  }

  function clear () {
    window.location.reload();
  }

  function sortNames () {

  }

  return (
    <div className="App">
      <div className="App-container">
        <div className="inputs">
          <form onSubmit={submitName} className="name-submit">
            <label>Enter a name</label>
            <input type="text" />
            <input type="submit" id="submitName" />
          </form>
          <button onClick={sortNames}>Sort!</button>
          <button onClick={clear}>Clear</button>
        </div>
        <div className="tiles">
          {tiles}
        </div>
      </div>
    </div>
  );
}

export default App;
