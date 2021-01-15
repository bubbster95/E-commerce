import React from 'react';

import './cart-icon.css'


const CartIcon = () => {
    return (
        <div className='cart-icon'>
            <img className='cart-icon-image' src='/assets/cart-icon.png' alt='Cart Icon'/>
            <span className='item-count'>0</span>
        </div>
    )
}

export default CartIcon;