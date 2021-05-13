import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Contact from './components/Contact';
import Error from './components/Error';
import Home from './components/Home';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

function App() {
  return (
    <Router>
      <Switch>
        <ErrorBoundary>
          <Route exact path="/" component={Home}/>
          <Route path="/contact" component={Contact}/>
          <Route path="/" component={Error}/>
        </ErrorBoundary>
      </Switch>
    </Router>
  );
}

export default App;
