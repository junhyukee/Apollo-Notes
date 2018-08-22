import React, { Component } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';

export default class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '' }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { username, password } = this.state
        this.props.onSubmit({ username, password });
    }

    render() {
        return (
            <div className="auth-form">
                <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Input
                            placeholder="Username"
                            value={this.state.username}
                            onChange={e => this.setState({ username: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            placeholder="Password"
                            type="password"
                            value={this.state.password}
                            onChange={e => this.setState({ password: e.target.value })}
                        />
                    </FormGroup>
                    <div className="errors">
                        {this.props.errors.map(err => <div key={err}>{err}</div>)}
                    </div>
                    <Button>Submit</Button>
                </Form>
            </div>
        )
    }
}
