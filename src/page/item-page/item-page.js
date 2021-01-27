import React from 'react';
import {productInfo} from '../../firebase';

import './item-page.css'

import QtyCounter from '../../component/qty-counter/qty-counter'
import ItemImage from '../../component/item-image/item-image'

class ItemPage extends React.Component {
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

        }
    }

    componentDidMount() {
        this.getInfo()
    }

    addToCart = () => {
        let quantity = parseInt(document.getElementsByClassName('item-quantity')[0].innerHTML);

        if (isNaN(quantity)) {
            quantity = 1
        }

        localStorage.setItem(this.props.skew, quantity)
        this.props.updateCount()
    }

    render() {
        return (
            <div className='item-page'>
                <div className='item-page-container' key={this.props.skew} >
                    <ItemImage skew={this.props.skew} object={this.state.object}/>
                    <div className='info-page-container'>
                        <h2 className='item-title'>{this.state.object['title']}</h2>
                        <p className='item-price'>${this.state.object['price']}</p>
                        <QtyCounter skew={this.props.skew} />
                        <button className='add-to-cart' onClick={this.addToCart}>Add To Cart</button>

                        <p className='item-description'>{this.state.object['description']}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ItemPage;