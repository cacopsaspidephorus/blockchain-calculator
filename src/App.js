import React from 'react'
import Calc from './components/Calc';
import History from './components/History';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Calc />
          <History />
        </div>
      </div>
    );
  }
}

export default App;