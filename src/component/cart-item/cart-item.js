import React from 'react';
import { getBGImageFromStore, productInfo } from '../../firebase'

import './cart-item.css'

import QtyCounter from '../qty-counter/qty-counter';

class CartItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            object: {}
        }

        this.getInfo = async () =>{
            let productObject = await productInfo(this.props.skew)
            this.setState({
                object: productObject
            })

            this.getImage()
            this.props.cartTotal(this.state.object['price'], this.props.skew)
        }
    }

    componentDidMount() {
        this.getInfo()
    }

    getImage = () => {
        getBGImageFromStore(
            this.props.skew,
            this.state.object['url']['bucket'],
            this.state.object['url']['image'] + '_0.jpeg',
            `check-out-item-${this.props.skew}`
        )
    }

    removeItem = () => {
        localStorage.removeItem(this.props.skew)
        this.props.updateCount()
        this.props.cartTotal(0, this.props.skew)
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