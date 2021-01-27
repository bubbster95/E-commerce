import React from 'react';
import { getImageFromStore, productInfo } from '../../firebase'

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
        }
    }

    componentDidMount() {
        this.getInfo()
    }

    getImage = () => {
        getImageFromStore(
            this.props.skew,
            this.state.object['url']['bucket'],
            this.state.object['url']['image'] + '_0.jpeg'
        )
    }

    removeItem = () => {
        localStorage.removeItem(this.props.skew)
        this.props.updateCount()
    }

    render() {
        return(
            <div className='cart-item-container' key={this.props.skew} >
                    <div className='cart-image-container'>
                        <img className='cart-image' id={this.props.skew} alt={this.state.object['title']}/>
                    </div>
                    <div className='cart-info-container'>
                        <h2 className='cart-item-title'>{this.state.object['title']}</h2>
                        <span className='cart-item-price'>${this.state.object['price']}</span>
                        <button onClick={this.removeItem}>Remove Item</button>
                        
                        <QtyCounter
                            skew={this.props.skew}
                            updateCount={this.props.updateCount}
                        />
                    </div>
                </div>
        )
    }
}

export default CartItem