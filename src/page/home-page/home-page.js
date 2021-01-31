import React from 'react';
import { Switch, Route, } from "react-router-dom";
import { auth,  createUserProfileDocument } from '../../firebase'
import { getCart } from '../../local-storage'

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
            count: 0
        }

        // updates cart icon number
        this.updateCount = () => {
            this.setState({count: 0})
            let cart = getCart()

            if (cart){
                let storeKeys = Object.keys(cart)
    
                let reduced = 0;
                storeKeys.map(item => {
                    return reduced += parseInt(cart[item])
                })
                this.setState({ count: reduced })
            }
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
        this.updateCount();
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth()
    }

    // renders a page for each item chosen for viewing
    renderItemPage = (routerProps) => {
        let skew = routerProps.match.params.skew
        return <ItemPage skew={skew} updateCount={this.updateCount} />
    }

    // renders a page populated with items in the category chosen
    renderCategoryPage = (routerProps) => {
        let path = routerProps.match.params.path
        return <CategoryPage type={path}/>
    }

    render() {
        return <div className='home-page'>
            <Nav currentUser={this.state.currentUser} count={this.state.count} />
            <Switch>
                <Route exact path="/about"component={About} />

                <Route exact path="/cart" >
                    <Cart updateCount={this.updateCount}/>
                </Route>

                <Route exact path="/sign-in-sign-up" component={SignInSignUp} />

                <Route exact path={'/:path'} render={this.renderCategoryPage}/>

                <Route exact path={`/:path/:skew`} render={this.renderItemPage} />

                <Route exact path="/" >
                    <Shop />
                </Route>
            </Switch>
        </div>;
    }
}

export default HomePage;

