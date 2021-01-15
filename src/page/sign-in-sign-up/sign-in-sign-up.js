import React from 'react';

import SignIn from '../../component/sign-in/sign-in';
import SignUp from '../../component/sign-up/sign-up'

import './sign-in-sign-up.css'

class SignInSignUp extends React.Component {
    render() {
        return(
            <div className="page sign-in-sign-up">
                <SignIn />
                <SignUp />
            </div>
        )
    }
}

export default SignInSignUp;