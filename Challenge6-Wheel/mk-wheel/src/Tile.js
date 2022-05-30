import React, { useState } from 'react'
import './Tile.css';
import tile from './imgs/tile.png'
import logo from './imgs/mk-logo.png'

function Tile(props) {
  let tiles = []
  for (let i=0; i <= props.count; i++) {
    tiles.push( <div className="single-tile">
    <img src={tile} className="tile-bkg" alt="Mortal Kombat tile" />
    <p className="names" >{props.name}</p>
    <img src={logo} className="character" alt="Mortal Kombat character" ></img>
  </div>)
  }
  return (
    <div className="Tile">
      {tiles}
    </div>
  );
}

export default Tile;