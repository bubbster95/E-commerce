import React from 'react';
import { collectionInfo } from '../../firebase';

import { getCart, setCart } from '../../local-storage'

import './item-page.css'

import QtyCounter from '../../component/qty-counter/qty-counter'
import ItemImage from '../../component/item-image/item-image'
import AddedToCart from '../../component/added-to-cart/added-to-cart'

class ItemPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            object: {}
        }

        this.getInfo = async () =>{
            this.setState({
                object: await collectionInfo('product', this.props.skew)
            })

        }
    }

    componentDidMount() {
        this.getInfo()
    }

    toggle = () => {
        let popUp = document.getElementsByClassName('added-to-cart-wrapper')[0];
        if (popUp.className === 'added-to-cart-wrapper') {
            popUp.className = 'added-to-cart-wrapper flex'
        } else {
            popUp.className = 'added-to-cart-wrapper'
        }
    }

    addToCart = () => {
        let quantity = parseInt(document.getElementsByClassName('item-quantity')[0].innerHTML);

        if (isNaN(quantity)) {
            quantity = 1
        }
        if (getCart()) {
            let cart = getCart()
            cart[this.props.skew] = quantity
            setCart(cart)
        } else {
            setCart({[this.props.skew]: quantity})
        }

        this.props.updateCount()
        this.toggle()
    }

    render() {
        return (
            <div className='item-page'>
                <div className='item-page-container' key={this.props.skew} >
                    <ItemImage skew={this.props.skew} />
                    <AddedToCart toggle={this.toggle} object={this.state.object}/>
                    <div className='info-page-container'>
                        <h2 className='item-title'>{this.state.object['title']}</h2>

                        <h3 className='item-sub'>{this.state.object['sub']}</h3>

                        <p className='item-price'>${this.state.object['price']}</p>
                        
                        <div className='add-qty'>
                            <QtyCounter className='qty-counter' skew={this.props.skew} />
                            <button className='add-to-cart' onClick={this.addToCart}>Add To Cart</button>
                        </div>

                        <p className='item-description'>{this.state.object['description']}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ItemPage;