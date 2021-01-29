import React from 'react';

import CartItem from '../../component/cart-item/cart-item'

import './cart.css'

class Cart extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            object: {},
            total: 0
        }



    }

    updateObject = (skew, newObject) => {
        this.setState((state) => ({
            object: {...state.object, [skew]: newObject}
        }))
    }

    componentDidUpdate() {
        console.log(this.state.object)
    }
    
    cartItems = () => {
        let storeKeys = Object.keys(localStorage)

        return storeKeys.map(item => {

            return <CartItem
                skew={item}
                updateCount={this.props.updateCount}
                updateObject={this.updateObject}
                cartTotal={this.cartTotal}
                quantity={localStorage[item]}
                key={item}
            />
        })
    }

    componentDidMount() {
        this.populateCheckOut()
    }

    populateCheckOut = () => {
        let cartPage = document.getElementsByClassName('cart-page')[0];
        let popUp = document.createElement('DIV');
        popUp.className = 'cart-check-out'
        cartPage.appendChild(popUp)

        let storeKeys = Object.keys(localStorage)

        storeKeys.map(async item => {
            console.log(this.state.object[item])
            let itemWrap = document.createElement('DIV');
            itemWrap.className = 'check-out-item';
            itemWrap.key=`check-out-${item}`;
            popUp.appendChild(itemWrap)

            let image = document.createElement('DIV');
            image.className = 'check-out-image';
            image.id = `check-out-${item}`;
            itemWrap.appendChild(image)

            let textBox = document.createElement('DIV');
            textBox.className = 'check-out-text-box';
            itemWrap.appendChild(textBox);

            await this.state.object[item]
            let title = document.createElement('H2');
            title.innerHTML = `${this.state.object[item]}`
            return null
        })
    }

    cartTotal = (price, skew, add) => {
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