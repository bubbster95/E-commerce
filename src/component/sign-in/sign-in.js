import React from 'react';

import { auth, signInWithGoogle } from '../../firebase'

import './sign-in.css'

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }

        this.handleSubmit = async event => {
            event.preventDefault();

            const { email, password } = this.state;

            try {
                await auth.signInWithEmailAndPassword(email, password);
                this.setState({ email: '', password: '' });
            } catch (error) {
                console.log(error)
            }

            this.setState({ email: '', password: '' });
        }
    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value })
    }

    render() {
        return (
            <div className="sign-in sign">
                <h2 className="title">I already have an account</h2>
                <span className="sub">Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <input
                        name="email"
                        type="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        placeholder="Email"
                        required
                    />

                    <input
                        name="password"
                        type="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        placeholder="Password"
                        required
                     />

                    <input className='submit' type="submit" value="submit Form" />
                    <input className='submit google-sign-in' onClick={signInWithGoogle} type="button" value="Sign In With Google"/>
                </form>
            </div>
        )
    }
}

export default SignIn;