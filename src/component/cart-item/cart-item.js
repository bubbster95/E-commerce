import React from 'react';
import { getImageFromStore, productInfo } from '../../firebase'

import './cart-item.css'

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
        }
    }

    componentDidMount() {
        this.getInfo()
    }

    getImage = () => {
        getImageFromStore(
            this.props.skew,
            this.state.object['url']['bucket'],
            this.state.object['url']['image']
        )
    }

    render() {
        return(
            <div className='cart-item-container' key={this.props.skew} >
                    <div className='cart-image-container'>
                        <img className='cart-image' id={this.props.skew} alt={this.state.object['title']}/>
                    </div>
                    <div className='cart-info-container'>
                        <h2 className='cart-item-title'>{this.state.object['title']}</h2>
                        <p className='cart-item-price'>${this.state.object['price']}</p>
                        <div>
                            <span>Quantity</span>
                            <input className='cart-item-quantity' type="number" placeholder='1'/>
                        </div>
                        <button className='clear-cart' onClick={this.clearCart}>Clear Cart</button>
                    </div>
                </div>
        )
    }
}

export default CartItem