import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

//components
import Contact from './components/Contact';
import Error from './components/Error';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Header from './components/layout/Header';
import Menu from './components/layout/Menu';
import About from './components/About';
import Profile from './components/Profile';

//style
import './App.css'

// redux store 
import { useDispatch } from 'react-redux'
import { setInfo, isLogged } from './actions'

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
    console.error(error, errorInfo);
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
  const dispatch = useDispatch()

  useEffect(()=> {
    const token = localStorage.getItem('token')
    if(!token) return
    fetch('http://localhost:5000/users/valideToken', {
     headers: {
       "Authorization": token
     }
    }).then(res => {

      if(res.status >= 400) throw new Error({error:"Unauthorized"})
      return res.json()

    }).then(data => {

      dispatch(setInfo(data.user))
      dispatch(isLogged(true))

    }).catch(err => console.log(err))
  })

  return (
    <ErrorBoundary>
      <Router>
        <div id="wrapper">
          <Header classes='alt'/>
          <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/register" component={Register}/>
              <Route path="/login" component={Login}/>
              <Route path="/contact" component={Contact}/>
              <Route path="/about" component={About}/>
              <Route path="/profile" component={Profile}/>
              <Route component={Error}/>
          </Switch>
        </div>
        <Menu/>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
