import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Note from './Note';
import EditNote from './EditNote';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import fetchNote from '../queries/fetchNote';

class SingleNote extends Component {
    constructor(props){
        super(props);
        this.state = {
            updateActive: false,
            modal: false
        }
    }
    toggleUpdate = () => {
        this.setState((prevState) => { 
            return {updateActive: !prevState.updateActive}
        });
    }

    toggleModal = () => {
        this.setState((prevState) => {
            return {modal: !prevState.modal};
        });
    }

    deleteNote = () => {
        this.props.mutate({
            variables: { 
                id: this.props.match.params.id 
            }
        }).then(() => this.props.history.push('/'))
    }

    render() {
        if (this.props.data.loading){
            return(<div></div>)
        }
        return (
            <div>
                <Note title={this.props.data.note.title} content={this.props.data.note.content} tags={this.props.data.note.tags} />
                <Button onClick={this.toggleUpdate} color="primary">Update</Button>
                <Button onClick={this.toggleModal} color="danger">Delete</Button>
                {this.state.updateActive !== false
                    ? <EditNote onCancel={this.toggleUpdate} title={this.props.data.note.title} content={this.props.data.note.content} tags={this.props.data.note.tags} id={this.props.match.params.id} />
                    : null
                }
                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Are you sure you want to delete this note?</ModalHeader>
                    <ModalBody>
                        <Button color="danger" onClick={this.deleteNote}>Delete</Button>{' '}
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mutation = gql`
    mutation DeleteNote($id: ID){
        deleteNote(id: $id){
            id
    }
}
`

export default graphql(mutation)(graphql(fetchNote, {
    options: (props) => { return { variables: { id: props.match.params.id }}}
})(SingleNote));