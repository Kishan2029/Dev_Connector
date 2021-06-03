import React, { Fragment } from 'react'
import Navbar from './component/layout/Navbar'
import Landing from './component/layout/Landing'
import './App.css';

const App = () => (
  <div className="App">
    <Fragment>
      <Navbar />
      <Landing />
    </Fragment>
  </div>
)


export default App;
