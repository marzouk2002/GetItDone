import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Error from './components/Error';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/" component={Error}/>
      </Switch>
    </Router>
  );
}

export default App;
