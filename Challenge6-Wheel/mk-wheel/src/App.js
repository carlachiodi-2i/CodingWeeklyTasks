import './App.css';
import Tile from './Tile';
// import logo from './mk-logo.png'

function App() {
  let tiles = []
  function submitName(e) {
    e.preventDefault()
    tiles.push(<Tile name={e.target[0].value} />)
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
        </div>
        {/* {tiles.length > 0 ?
        <div className="tiles">
          {tiles}
        </div> : ''} */}
        <div className="tiles">
        <Tile name='test' />
        </div>
      </div>
    </div>
  );
}

export default App;
