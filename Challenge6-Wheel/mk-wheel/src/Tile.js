import React from 'react'
import './Tile.css';
import tile from './imgs/tile.png'

function Tile(props) {
  
  function checkSize (string) {
    let styleLongName
    if (string.length >= 10) {
      styleLongName = {overflowWrap: 'break-word', bottom: '10px', fontSize: '1.0vw'}
    } else {
      styleLongName = {overflowWrap: 'break-word', bottom: '10px', fontSize: '1.5vw'}
    }
    return styleLongName
  }


  let styleShortName = {bottom: '25px', fontSize: '1.5vw'}

  let tiles = []

  for (let i=0; i <= props.count; i++) {
    tiles.push(
    <div className="single-tile" key={`single-tile-${i}`}>
      <img src={tile} className="tile-bkg" alt="Mortal Kombat tile" />
      <p className="names" style={(props.name.length > 5) ? checkSize(props.name) : styleShortName}> {props.name} </p>
      <img src={props.character} className="character" alt="Mortal Kombat character" />
    </div>)
  }

  return (
    <div className="Tile">
      {tiles}
    </div>
  )
}

export default Tile;