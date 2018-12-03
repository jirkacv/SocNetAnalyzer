import React, { Component } from 'react';
import Navigation from './components/Navigation';
import Datasets from './components/Datasets';

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <Datasets />
      </div>
    );
  }
}

export default App;
