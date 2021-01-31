import React from 'react';

import { getCart, setCart } from '../../local-storage'

import './qty-counter.css';


class QtyCounter extends React.Component {
    changeQty = (add) => {
        let cart = getCart()
        let itemCount = cart[this.props.skew]
        let quantity = document.getElementsByClassName('item-quantity')[0]

        // if adding to existing count
        if (this.props.updateCount) {
            // if the number hasn't reached zero update storage and cart total
            if (itemCount >= 1) {
                cart[this.props.skew] = parseInt(itemCount) + add
                this.props.cartTotal(this.props.price, this.props.skew, add)

            // if number is zero only allow adding to update storage and cart total
            } else if (add === 1) {
                cart[this.props.skew] = parseInt(itemCount) + add
                this.props.cartTotal(this.props.price, this.props.skew, add)
            }
            setCart(cart)
            this.props.updateCount()
        
        } else {
            // if the number hasn't reached zero 
            if (quantity.innerHTML >= 1) {
                quantity.innerHTML = parseInt(quantity.innerHTML) + add
                
            //if the number is zero only add, don't subtract
            } else if (add === 1) {
                quantity.innerHTML = parseInt(quantity.innerHTML) + add
            }
        }
    }

    // updates number to display in qty-counter
    checkQty = () => {
        let cart = getCart()
        if (cart && cart[this.props.skew]) {
            return cart[this.props.skew]
        } else {
            return 1
        }
    }

    render() {
        return(
            <div className='qty'>
            <p className='qty-text'>Qty: </p>
                <span>
                    <button className='qty-arrow' onClick={() => this.changeQty(-1)}>{'-'}</button>
                    <div className='item-quantity'>{this.checkQty()}</div>
                    <button className='qty-arrow' onClick={() => this.changeQty(1)}>{'+'}</button>
                </span>
            </div>
        )
    }
}

export default QtyCounter;