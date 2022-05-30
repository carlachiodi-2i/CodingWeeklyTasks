import './Tile.css';
import tile from './imgs/tile.png'
import logo from './imgs/mk-logo.png'

function Tile(props) {
  return (
    <div className="Tile">
      <img src={tile} className="tile-bkg" alt="Mortal Kombat tile"/>
        <p>{props.name}</p>
        <img src={logo} className="character" alt="Mortal Kombat character"></img>
    </div>
  );
}

export default Tile;