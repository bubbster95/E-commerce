import React from 'react';
import { Link } from "react-router-dom";
import { auth } from '../../firebase'

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
    </div>
)


export default Nav;