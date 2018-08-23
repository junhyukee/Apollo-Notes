import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';

import Notes from './components/Notes';
import SingleNote from './components/SingleNote';
import NoteForm from './components/NoteForm';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Signup from './components/Signup';
import RequireAuth from './components/RequireAuth';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Route exact path="/" component={RequireAuth(Notes)} />
        <Route path="/note/add" component={RequireAuth(NoteForm)} />
        <Route path="/notes/:id" component={SingleNote} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </div>
    );
  }
}

export default App
