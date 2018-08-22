import React, { Component } from 'react'

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
            <div className="row">
                <form onSubmit={this.onSubmit} className="col s6">
                    <div className="input-field">
                        <input
                            placeholder="Username"
                            value={this.state.username}
                            onChange={e => this.setState({ username: e.target.value })}
                        />
                    </div>
                    <div className="input-field">
                        <input
                            placeholder="Password"
                            type="password"
                            value={this.state.password}
                            onChange={e => this.setState({ password: e.target.value })}
                        />
                    </div>
                    <div className="errors">
                        {this.props.errors.map(err => <div key={err}>{err}</div>)}
                    </div>
                    <button className="btn">Submit</button>
                </form>
            </div>
        )
    }
}
