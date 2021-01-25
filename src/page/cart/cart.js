import React from 'react';

import CartItem from '../../component/cart-item/cart-item'

class Cart extends React.Component {
    cartItems = () => {
        let storeKeys = Object.keys(localStorage);

        return storeKeys.map(item => {
            return <CartItem
                skew={item}
                quantity={localStorage[item]}
                key={item}
            />
        })
    }

    render() {
        return <div className="page">{this.cartItems()}</div>
    }
}

export default Cart