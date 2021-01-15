import React from 'react';

import './home-page.css'

import { auth,  createUserProfileDocument } from '../../firebase'
import Nav from '../../component/nav/nav.js'

class HomePage extends React.Component {
    constructor() {
        super();

        this.state = {
            currentUser: null
        }
    }

    unsubscribeFromAuth = null;

    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth); 

                userRef.onSnapshot(snapShot => {
                    this.setState({
                        currentUser: {
                            id: snapShot.id,
                            ...snapShot.data()
                        }
                    })
                });
            } else {
                this.setState({currentUser: userAuth});
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth()
    }

    render() {
        return <div className='home-page'>
            <Nav currentUser={this.state.currentUser} />
        </div>;
    }
}

export default HomePage;

