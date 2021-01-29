import React from 'react';

import CartItem from '../../component/cart-item/cart-item'

import './cart.css'

class Cart extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            storeKeys: Object.keys(localStorage),
            total: 0
        }
    }
    cartItems = () => {

        return this.state.storeKeys.map(item => {
            return <CartItem
                skew={item}
                updateCount={this.props.updateCount}
                cartTotal={this.cartTotal}
                quantity={localStorage[item]}
                key={item}
            />
        })
    }

    cartTotal = (price, skew, add) => {
        console.log('updated price')
        if (add) {
            let newTotal = this.state.total + (price * add)
            this.setState({
                total: (Math.round(newTotal * 100) / 100)
            })
        } else  {
            let newTotal = this.state.total + (price * localStorage[skew]);
            this.setState({
                total: (Math.round(newTotal * 100) / 100)
            })
        }
    }

    clearCart = () => {
        localStorage.clear()
        this.props.updateCount()
    }

    checkOut = () => {
        let cartPage = document.getElementsByClassName('cart-page')[0];
        let popUp = document.createElement('DIV');
        popUp.className = 'cart-check-out'
        cartPage.appendChild(popUp)

        this.state.storeKeys.map(item => {
            let checkOut = document.createElement('DIV');
            checkOut.className = 'check-out-item';
            checkOut.id = `check-out-${item}`;
            checkOut.key=`check-out-${item}`;
            return cartPage.appendChild(checkOut)
        })
    }

    render() {
        if (localStorage.length >=1) {
            return (
                 <div className='cart-page'>
                    {this.cartItems()}
                    <div className='cart-total'>Total: ${this.state.total}</div>
                    <button className='cart-controls' onClick={this.clearCart}>Clear Cart</button>
                    <button className='cart-controls' onClick={this.checkOut}>Check Out</button>
                </div>
            )
        } else {
            return (
                <div className='cart-page'>
                    <h1 className='empty-cart'>Your Cart Is empty</h1>
                </div>
            )
        }
    }
}

export default Cart