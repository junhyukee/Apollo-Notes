import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import fetchNote from '../queries/fetchNote';

class EditNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            content: this.props.content,
            tags: this.props.tags
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    updateNote = event => {
        event.preventDefault();
        let tagArray = [];
        if (Array.isArray(this.state.tags)) {
            tagArray = this.state.tags;
        } else {
            tagArray = this.state.tags.split(' ').join('').split(',')
        }
        this.props.mutate({
            variables: {
                id: this.props.id,
                title: this.state.title,
                content: this.state.content,
                tags: tagArray
            },
            refetchQueries: [{ query: fetchNote, variables: { id: this.props.id }} ]
        });
        this.props.onCancel();
    }

    render() {
        return (
            <Form onSubmit={this.updateNote} className="note-form">
                <FormGroup>
                    <Label for="title">Updated Title</Label>
                    <Input type="text" name="title" id="title" onChange={this.handleChange} value={this.state.title} required></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="content">Updated Note</Label>
                    <Input type="textarea" name="content" id="content" onChange={this.handleChange} value={this.state.content} required></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="tags">Tags</Label>
                    <Input type="text" name="tags" id="tags" onChange={this.handleChange} value={this.state.tags} required></Input>
                </FormGroup>
                <Button color="primary">Update</Button>
                <Button type="button" onClick={this.props.onCancel} color="danger">Cancel</Button>
            </Form>
        )
    }
}

const mutation = gql`
    mutation UpdateNote($id: ID, $title: String, $content: String, $tags: [String]) {
        updateNote(id: $id, title: $title, content: $content, tags: $tags){
            id
        }
    }
`

export default graphql(mutation)(EditNote);