import React from 'react'
import './Tile.css';
import tile from './imgs/tile.png'

function Tile(props) {
  let w = window.innerWidth

  function checkSize (string) {
    let styleLongName
    if (string.length >= 6) {
      styleLongName = {overflowWrap: 'break-word', bottom: (w > 450) ? '-60px' : '10px', fontSize: (w > 450) ? '1.0vw' : '1.5vw'}
    } else {
      styleLongName = {overflowWrap: 'break-word', bottom: (w > 450) ? '-55px' : '15px', fontSize: (w > 450) ? '1.2vw' : '2vw'}
    }
    return styleLongName
  }


  let styleShortName = {bottom: (w > 450) ? '-55px' : '15px', fontSize: (w > 450) ? '1.5vw' : '3vw'}

  let tiles = []

  for (let i=1; i <= props.count; i++) {
    tiles.push(
    <div className="single-tile" key={`single-tile-${i}`} id={`single-tile-${i}`}>
      <img src={tile} className="tile-bkg" alt="Mortal Kombat tile" id={`tile-${i}`}/>
      <p className="names" style={(props.name.length > 4) ? checkSize(props.name) : styleShortName}> {props.name} </p>
      <img src={props.character} className="character" alt="Mortal Kombat character" />
      <div id={`border-${i}`} className='border'></div>
    </div>)
  }

  return (
    <div className="Tile">
      {tiles}
    </div>
  )
}

export default Tile;