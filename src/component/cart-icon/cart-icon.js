import React from 'react';

import './cart-icon.css'

class CartIcon extends React.Component {
    render() {
        return (
            <div className='cart-icon'>
                <img className='cart-icon-image' src='/assets/cart-icon.png' alt='Cart Icon'/>
                <span className='item-count'>{this.props.count}</span>
            </div>
        )
    }
}

export default CartIcon;