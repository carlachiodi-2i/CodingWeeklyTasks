import React, { useState } from 'react'
import './App.css';
import Tile from './Tile';
import characters from './imgs/characters/characters';


function App() {
  let w = window.innerWidth

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

  function maxNames () {
    let sizes = Object.keys(maxNamesPerWidth)
    //define maximum number of name tiles according to the window size
    if (w <= sizes[0]) {
      return maxNamesPerWidth[sizes[0]]
    } else if (w > sizes[0] && w <= sizes[1]) {
      return maxNamesPerWidth[sizes[1]]
    } else if (w >= sizes[2]) {
      return maxNamesPerWidth[sizes[2]]
    }
  }
  
  function toggleAnimation (bottomBaseline, iterator, breakPoint, row, bottomIncrement, leftBaseline, leftIncrement, delay, toggle) {
    if (toggle === 'on') {
      return {bottom: (bottomBaseline + (iterator-(breakPoint*(row-1)))*bottomIncrement).toString() + 'px', left: (leftBaseline + leftIncrement*(row-1)).toString() + "px", animation: 'fadeinout', animationDuration: '300ms', animationDelay: (delay * iterator).toString() + 'ms'}
    } else {
      return {animation: 'none', animationDuration: 'none', animationDelay: 'none'}
    }
  }

  function incrementTileCss (iterator, border=false, toggle='off') {
    let breakPoint 
    let leftIncrement
    let bottomBaseline
    let leftBaseline
    let bottomIncrement
    let delay = 250

    if (w <= 450) {
      breakPoint = 12
      bottomIncrement = 41
      leftIncrement = 100
      bottomBaseline = -10
      leftBaseline = -75
    }
    else {
      breakPoint = 9
      bottomIncrement = 75
      leftIncrement = 200
      bottomBaseline = (border) ? -155 : -30
      leftBaseline = (border) ? 6 : 0
    }
    let row = Math.ceil(iterator/breakPoint)

    if (border) {
      return toggleAnimation(bottomBaseline, iterator, breakPoint, row, bottomIncrement, leftBaseline, leftIncrement, delay, toggle)
    } else {
      return {bottom: (bottomBaseline + (iterator-(breakPoint*(row-1)))*bottomIncrement).toString() + 'px', left: (leftBaseline + leftIncrement*(row-1)).toString() + "px"}
    }
  }


  function css(element, style) {
    for (const property in style)
        element.style[property] = style[property];
  }
  
  function selected(i) {
    let border = document.getElementById(`border-${i}`)
    css(border, {border: '5px solid rgb(163,255,25)'})
  }
  
  function moveBorderCss(total) {
    for (let i = 1; i <= total; i++) {
      let border = document.getElementById(`border-${i}`)
      css(border, incrementTileCss(i, true, 'on'))   
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
    if (newCount >= maxNames()) {
      document.getElementById('submitName').disabled = true
    } else {
      document.getElementById('submitName').disabled = false
    }

    // Clear input field
    document.getElementById('nameInput').value = ''
  }
    
  for (let i = 1; i <= count; i++) {
    // Check window size to define the css increments
    let tileStyle = incrementTileCss(i)
  
    tiles.push(<div className="tile" style={tileStyle} key={`tile-${i}`}>
        <Tile key={`tile-${i}`} name={names[i-1]} count={count} character={(i <= charactersList.length) ? characters[charactersList[i-1]] : characters[charactersList[(i-charactersList.length)-1]]} />
      </div>)
  }

  function clear () {
    window.location.reload();
  }

  function randomNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
  function sortNames () {
    // Get random number of spins
    let randomSelection = randomNumber(1, count)
    console.log(randomSelection, count)
    // Make green border around each tile
    moveBorderCss(count)
    setTimeout(()=> {selected(randomSelection, 'on')}, 400*count)
  }

  return (
    <div className="App">
      <div className="App-container">
        <div className="inputs">
          <form onSubmit={submitName} className="name-submit">
            <label>Enter a name</label>
            <input type="text" id="nameInput" />
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
