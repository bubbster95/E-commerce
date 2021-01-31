import React from 'react';

import {auth, createUserProfileDocument } from '../../firebase'

import './sign-up.css'

class SignUp extends React.Component {
    constructor() {
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {displayName, email, password, confirmPassword} = this.state;

        if (password !== confirmPassword) {
            alert("passwords don't match");
            return
        }

        try {
             const { user } = await auth.createUserWithEmailAndPassword(
                email,
                password
            );

            await createUserProfileDocument(user, { displayName });

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });

        } catch (error) {
            alert(error)
        };
    };

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value })
    };

    render() {
        return(
            <div className="sign-up sign">
                <h2 className="title">I do not have an account</h2>
                <span className="sub">Sign up with your email and password</span> 
                <form onSubmit={this.handleSubmit}>
                    <input 
                    type='text'
                    name='displayName'
                    value={this.displayName}
                    onChange={this.handleChange}
                    placeholder='Display Name'
                    required
                    >
                    </input>

                    <input 
                    type='email'
                    name='email'
                    value={this.email}
                    onChange={this.handleChange}
                    placeholder='Email'
                    required
                    >
                    </input>

                    <input 
                    type='password'
                    name='password'
                    value={this.password}
                    onChange={this.handleChange}
                    placeholder='Password'
                    required
                    >
                    </input>

                    <input 
                    type='password'
                    name='confirmPassword'
                    value={this.confirmPassword}
                    onChange={this.handleChange}
                    placeholder='Confirm Password'
                    required
                    >
                    </input>

                    <input className='submit' type="submit" value="Sign Up" onClick={this.handleSubmit}/>
                </form>
            </div>
        )
    }
}

export default SignUp;