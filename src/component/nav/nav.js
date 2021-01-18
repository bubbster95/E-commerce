import React from 'react';

import {
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { auth } from '../../firebase'

import Home from '../../page/home/home'
import About from '../../page/about/about'
import Shop from '../../page/shop/shop'
import Cart from '../../page/cart/cart'
import SignInSignUp from '../../page/sign-in-sign-up/sign-in-sign-up'
import CartIcon from '../cart-icon/cart-icon'

import './nav.css'


const Nav = ({currentUser}) => (
    <div>
        <nav className="nav-container">
        <ul>
            <li>
                <Link className="link" to="/">Home</Link>
            </li>
            <li>
                <Link className="link" to="/about">About</Link>
            </li>
            <li>
                <Link className="link" to="/shop">Shop</Link>
            </li>
            <li>
                <Link className="link" to="/cart"><CartIcon /></Link>
            </li>

            {
                currentUser ?
                <li>
                    <Link className="link" to="/" onClick={() => auth.signOut()}>Sign Out</Link>
                </li>
                :
                <li>
                    <Link className="link" to="/sign-in-sign-up">Sign In</Link>
                </li>
            }
        </ul>
        </nav>

        <Switch>
            <Route exact path="/about" component={About} />
            <Route exact path="/shop" component={Shop} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/sign-in-sign-up" component={SignInSignUp} />
            <Route exact path="/" component={Home} />
        </Switch>
    </div>
)


export default Nav;