import React from 'react';
import { Switch, Route, } from "react-router-dom";
import { auth,  createUserProfileDocument } from '../../firebase'

import Nav from '../../component/nav/nav.js'
import Home from '../../page/home/home'
import About from '../../page/about/about'
import Shop from '../../page/shop/shop'
import Cart from '../../page/cart/cart'
import SignInSignUp from '../../page/sign-in-sign-up/sign-in-sign-up'
import ItemPage from '../item-page/item-page'

import './home-page.css'

class HomePage extends React.Component {
    constructor() {
        super();

        this.state = {
            currentUser: null,
            skew: null,
            path: null
        }

        this.setSkew = (newSkew) => {
            console.log(newSkew)
            this.setState({
                skew: newSkew
            });
        }

        this.setPath = (newPath) => {
            console.log(newPath)
            this.setState({
                path: newPath
            });
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
            <Switch>
                <Route exact path="/about" component={About} />

                <Route exact path="/shop" >
                    <Shop setPath={this.setPath} setSkew={this.setSkew}/>
                </Route>
                <Route exact path={this.state.path}>
                    <Shop setPath={this.setPath} setSkew={this.setSkew} type={this.state.skew} />
                </Route> 
                <Route exact path={'/shop/' + this.state.skew}>
                    <ItemPage skew={this.state.skew} />
                </Route> 

                <Route exact path="/cart" component={Cart} />
                <Route exact path="/sign-in-sign-up" component={SignInSignUp} />
                <Route exact path="/" component={Home} />
            </Switch>
        </div>;
    }
}

export default HomePage;

