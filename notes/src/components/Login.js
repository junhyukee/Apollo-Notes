import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import AuthForm from './AuthForm';
import query from '../queries/CurrentUser';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { errors: [] }
    }

    componentDidUpdate(prevProps){
        if (!prevProps.data.user && this.props.data.user ){
            this.props.history.push('/');
        }
    }

    onSubmit = ({ username, password }) => {
        this.props.mutate({
            variables: {
                username,
                password
            },
            refetchQueries: [{ query }]
        })
        .catch(res => {
            let errors = res.graphQLErrors.map(err => err.message);
            this.setState({ errors })
        })

    }

    render() {
        return (
            <div>
                <h3>Login</h3>
                <AuthForm errors={this.state.errors} onSubmit={this.onSubmit} />
            </div>
        )
    }
}

const mutation = gql `
    mutation Login($username: String, $password: String){
        login(username: $username, password: $password){
            id
            username
        }
    }
`

export default graphql(mutation)(graphql(query)(Login));