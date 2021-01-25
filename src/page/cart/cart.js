import React from 'react';

import CartItem from '../../component/cart-item/cart-item'

class Cart extends React.Component {
    cartItems = () => {
        let storeKeys = Object.keys(localStorage);

        return storeKeys.map(item => {
            return <CartItem
                skew={item}
                updateCount={this.props.updateCount}
                quantity={localStorage[item]}
                key={item}
            />
        })
    }

    clearCart = () => {
        localStorage.clear()
        this.props.updateCount()
    }

    render() {
        if (localStorage.length >=1) {
            return (
                 <div className='page'>
                    {this.cartItems()}
                    <button onClick={this.clearCart}>Clear Cart</button>
                </div>
            )
        } else {
            return (
                <div className='page'>
                    <h1>Your Cart Is empty</h1>
                </div>
            )
        }
    }
}

export default Cart