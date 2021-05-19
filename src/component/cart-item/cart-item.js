import React from 'react';
import { getBGImageFromStore, collectionInfo } from '../../firebase'

import './cart-item.css'

import QtyCounter from '../qty-counter/qty-counter';
import { getCart, setCart } from '../../local-storage';

class CartItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            object: {}
        }

        // sets object to specific item info, and updates, cart total, as well as checkout popup
        this.getInfo = async () =>{
            let productObject = await collectionInfo('product', this.props.skew)
            this.setState({
                object: productObject
            })
            this.getImage()
            this.props.cartTotal(this.state.object['price'], this.props.skew)
            this.props.addInfo(this.state.object,this.props.skew)
        }
    }

    componentDidMount() {
        this.getInfo()
    }

    // acceses image from firebase and sets it to a div bg style
    getImage = () => {
        getBGImageFromStore(
            this.props.skew,
            this.state.object['url']['image'] + '_0.jpeg',
            `check-out-${this.props.skew}`
        )
    }

    // removes this item updates total, cart, checkout states
    removeItem = () => {
        let cart = getCart()
        let priceTotal = (this.state.object['price'] * (cart[this.props.skew]))
        this.props.cartTotal(priceTotal, this.props.skew, -1)

        delete cart[this.props.skew]
        setCart(cart)
        this.props.removeInfo(this.props.skew)
        this.props.updateCount()
    }

    render() {
        return(
            <div className='cart-item-container' key={this.props.skew} >
                <div className='cart-image-container'>
                    <div className='cart-image' id={this.props.skew} alt={this.state.object['title']}/>
                </div>
                <div className='cart-info-container'>
                    <h2 className='cart-item-title'>{this.state.object['title']}</h2>
                    <h3 className='cart-item-sub'>{this.state.object['sub']}</h3>
                    <span className='cart-item-price'>${this.state.object['price']}</span>
                    <button className='remove-item' onClick={this.removeItem}>Remove Item</button>
                    
                    <QtyCounter
                        skew={this.props.skew}
                        updateCount={this.props.updateCount}
                        price={this.state.object['price']}
                        cartTotal={this.props.cartTotal}
                    />
                </div>
            </div>
        )
    }
}

export default CartItem