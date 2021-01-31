import React from 'react';
import { getCart, setCart } from '../../local-storage'

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
    
    componentDidUpdate() {
    }
    
    // dynamically render cart items
    cartItems = () => {
        let cart = getCart()
        let storeKeys = Object.keys(cart)

        return storeKeys.map(item => {
            return <CartItem
                skew={item}
                updateCount={this.props.updateCount}
                addInfo={this.addInfo}
                cartTotal={this.cartTotal}
                removeInfo={this.removeInfo}
                quantity={cart[item]}
                key={item}
            />
        })
    }

    componentDidMount() {
        this.populateCheckOut()
    }

    // creates check out items from cart list and adds image
    populateCheckOut = () => {
        let cartPage = document.getElementsByClassName('cart-page')[0];
        let popUp = document.createElement('DIV');
        popUp.className = 'cart-check-out'
        cartPage.appendChild(popUp)

        let close = document.createElement('BUTTON');
        close.innerHTML = 'X'
        close.id = 'close'
        close.className = 'cart-controls'
        close.addEventListener('click', () => this.closeOpen(popUp))
        popUp.appendChild(close)

        let explain = document.createElement('P');
        explain.innerHTML = `
        All of the items you have picked out can be found on REI.com. 
        They have a wonderful array of well photographed and documented products.
        Thanks to REI, I was Able to create this E-commerce site and learn quite a lot.
        If you'd like to purchase an item click the buttons below to visit REI.com.
        `;
        explain.className = 'cart-check-out-explain'
        popUp.appendChild(explain)

        let cart = getCart()
        let storeKeys = Object.keys(cart)
        
        storeKeys.map(item => {
            let itemWrap = document.createElement('DIV');
            itemWrap.className = 'check-out-item';
            itemWrap.key=`check-out-${item}`;
            itemWrap.id=`check-out-item-${item}`;
            popUp.appendChild(itemWrap)

            let image = document.createElement('DIV');
            image.className = 'check-out-image';
            image.id = `check-out-${item}`;
            itemWrap.appendChild(image)

            let textBox = document.createElement('DIV');
            textBox.className = 'check-out-text-box';
            textBox.id = `text-box-${item}`
            itemWrap.appendChild(textBox);

            return null
        })
    }

    // adds title, sub title, links to checkout items after async has gathered info
    addInfo = (object, skew) => {
        let textBox = document.getElementById(`text-box-${skew}`);

        let title = document.createElement('H2');
        title.className = 'check-out-title';
        title.innerHTML = `${object['title']}`;
        textBox.appendChild(title);

        let sub = document.createElement('H3');
        sub.className = 'check-out-sub';  
        sub.innerHTML = `${object['sub']}`;
        textBox.appendChild(sub); 
        
        let button = document.createElement('BUTTON');
        button.className = 'cart-controls'
        button.innerHTML = 'Buy from REI'
        button.addEventListener('click', () => window.open(object['link'], '_blank'))
        textBox.appendChild(button)
    }

    // removes div from check out if item have been removed from cart
    removeInfo = (skew) => {
        let popUp = document.getElementsByClassName('cart-check-out')[0]
        let child = document.getElementById(`check-out-item-${skew}`)
        popUp.removeChild(child)
    }

    // toggle check out visibility
    closeOpen = (popUp) => {
        if (popUp.className === 'cart-check-out') {
            popUp.className = 'cart-check-out visible'
        } else {
            popUp.className = 'cart-check-out'
        }
    }

    cartTotal = (price, skew, add) => {
        let cart = getCart()
        if (add) {
            let newTotal = this.state.total + (price * add)
            this.setState({
                total: (Math.round(newTotal * 100) / 100)
            })
        } else  {
            let newTotal = this.state.total + (price * cart[skew]);
            this.setState({
                total: (Math.round(newTotal * 100) / 100)
            })
        }
    }

    clearCart = () => {
        setCart({})
        this.props.updateCount()
    }

    render() {
        if (Object.keys(getCart()).length >=1) {
            return (
                 <div className='cart-page'>
                    {this.cartItems()}
                    <div className='cart-total'>Total: ${this.state.total}</div>
                    <div className='cart-controls-wrap'>
                        <button className='cart-controls clear-cart' onClick={this.clearCart}>Clear Cart</button>
                        <button className='cart-controls' onClick={() => this.closeOpen(document.getElementsByClassName('cart-check-out')[0])}>Check Out</button>
                    </div>
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