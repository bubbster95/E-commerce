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
    
    componentDidUpdate() {
    }
    
    cartItems = () => {
        let storeKeys = Object.keys(localStorage)

        return storeKeys.map(item => {
            return <CartItem
                skew={item}
                updateCount={this.props.updateCount}
                addInfo={this.addInfo}
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

        let close = document.createElement('BUTTON');
        close.innerHTML = 'X'
        close.className = 'cart-controls'
        close.addEventListener('click', () => this.closeOpen(popUp))
        popUp.appendChild(close)

        let storeKeys = Object.keys(localStorage)
        
        storeKeys.map(item => {
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
            textBox.id = `text-box-${item}`
            itemWrap.appendChild(textBox);

            return null
        })
    }

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

    closeOpen = (popUp) => {
        if (popUp.className === 'cart-check-out') {
            popUp.className = 'cart-check-out visible'
        } else {
            popUp.className = 'cart-check-out'
        }
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
                    <button className='cart-controls' onClick={() => this.closeOpen(document.getElementsByClassName('cart-check-out')[0])}>Check Out</button>
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