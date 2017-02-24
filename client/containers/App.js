import React from 'react';
import Nav from '../components/Nav';
import Boards from '../components/boards/Boards';

const App = () => (
  <div>
    <Nav />
    <div className="container">
      <Boards />
    </div>
  </div>
);

export default App;
