import React from 'react';
import { Switch, Route, } from "react-router-dom";
import { auth,  createUserProfileDocument } from '../../firebase'

import Nav from '../../component/nav/nav.js'

import About from '../../page/about/about'

import Shop from '../../page/shop/shop'
import ItemPage from '../item-page/item-page'
import CategoryPage from '../category-page/category-page'
import Cart from '../../page/cart/cart'

import SignInSignUp from '../../page/sign-in-sign-up/sign-in-sign-up'

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
            this.setState({
                skew: newSkew
            });
        }

        this.setPath = (newPath) => {
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


    renderItemPage = (routerProps) => {
        let skew = routerProps.match.params.skew
        return <ItemPage skew={skew} />
    }

    renderCategoryPage = (routerProps) => {
        let path = routerProps.match.params.path
        return <CategoryPage type={path}/>
    }

    render() {
        return <div className='home-page'>
            <Nav currentUser={this.state.currentUser} />
            <Switch>
                <Route exact path="/about" component={About} />

                <Route exact path={'/:path'} render={this.renderCategoryPage}/>

                <Route exact path={`/:path/:skew`} render={this.renderItemPage} />

                <Route exact path="/cart" component={Cart} />

                <Route exact path="/sign-in-sign-up" component={SignInSignUp} />

                <Route exact path="/" >
                    <Shop setPath={this.setPath} setSkew={this.setSkew}/>
                </Route>
            </Switch>
        </div>;
    }
}

export default HomePage;

