import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import NavBar from './components/NavBar';

import { Container } from 'react-bootstrap';
import UrlForm from './pages/UrlForm';
import ImagesList from './pages/ImagesList';


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div id='main'>
        <NavBar />
        <Container id='main-content'>
          <Router>
            <Switch>
              <Route path="/search">
                <UrlForm />
              </Route>
              <Route path="/images-list">
                <ImagesList />
              </Route>
              <Route path="/">
                <UrlForm />
              </Route>
            </Switch>
          </Router>
        </Container>
      </div>
    );
  }
}

export default App;