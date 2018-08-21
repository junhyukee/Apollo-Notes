import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';

import * as actions from './actions'
import Notes from './components/Notes';
import SingleNote from './components/SingleNote';
import NoteForm from './components/NoteForm';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar color="light">
          <NavbarBrand>Lambda Notes</NavbarBrand>
          <Nav>
            <NavItem>
              <NavLink tag={Link} to="/">View Notes</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/note/add">New Note</NavLink> 
            </NavItem>
          </Nav>
        </Navbar>
        <Route exact path="/" render={props => (
          <Notes {...props} />
        )} />
        <Route path="/note/add" render={props => (
          <NoteForm {...props} addNote={this.props.addNote} />
        )} />
        <Route path="/notes/:id" render={props => (
          <SingleNote {...props} note={this.props.note} />
        )}  />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetchingNotes: state.fetchingNotes,
    fetchingNote: state.fetchingNotes,
    notes: state.notes,
    note: state.note,
    error: state.error,
    updatingNote: state.updatingNote,
  }
}

export default withRouter(connect(mapStateToProps, actions)(App))
