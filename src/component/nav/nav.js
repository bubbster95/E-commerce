import React from 'react';
import { Link } from "react-router-dom";
import { auth } from '../../firebase'

import CartIcon from '../cart-icon/cart-icon'

import './nav.css'


const Nav = ({currentUser, count}) => (
    <nav className="nav-container">
    <ul>
        <li>
            <Link className="link" to="/">
                <div className='logo' aria-label='Shop' alt='base weight logo' style={{backgroundImage: 'url("/assets/base-weight-logo.png")'}} />
            </Link>
        </li>
        <li>
            <Link className="link" to="/about">About</Link>
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
        
        <li className='cart'>
            <Link className="link" to="/cart"><CartIcon count={count}/></Link>
        </li>
    </ul>
    </nav>
)


export default Nav;