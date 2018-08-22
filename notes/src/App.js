import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';

import Notes from './components/Notes';
import SingleNote from './components/SingleNote';
import NoteForm from './components/NoteForm';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Signup from './components/Signup';



class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Route exact path="/" render={props => (
          <Notes {...props} />
        )} />
        <Route path="/note/add" render={props => (
          <NoteForm {...props} />
        )} />
        <Route path="/notes/:id" render={props => (
          <SingleNote {...props} />
        )}  />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </div>
    );
  }
}

export default App
